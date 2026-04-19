from django.utils import timezone
from votacao.models import Questao, Opcao


# a) Criar uma questão
def criar_questao(texto_questao, lista_opcoes):
    """
    Alínea a)
    Criar uma questão e registá-la na BD. 
    Aceita uma string com o texto da questão e uma lista de opções (texto e votos).
    """
    q = Questao(questao_texto=texto_questao, pub_data=timezone.now())
    q.save()

    for opcao in lista_opcoes:
        if isinstance(opcao, list) and len(opcao) >= 2:
            texto = opcao[0]
            votos = opcao[1]
        elif isinstance(opcao, dict):
            texto = opcao.get('opcao_texto', '')
            votos = opcao.get('votos', 0)
        else:
            continue

        o = Opcao(questao=q, opcao_texto=texto, votos=votos)
        o.save()

    print(f"Questão '{texto_questao}' inserida com {len(lista_opcoes)} opções.")


# b) Testar criação
def testar_alinea_b():
    """
    Alínea b)
    Testar a função da alínea anterior criando 4 novas questões e respetivas opções.
    """
    print("=== A iniciar o registo de questões na BD (Alínea b) ===")

    criar_questao(
        'Qual simulador é mais utilizado no ensino de Redes de Computadores?',
        [['GNS3', 5], ['Packet Tracer', 25], ['EVE-NG', 2]]
    )

    criar_questao(
        'Qual o padrão arquitetural utilizado pela framework Django?',
        [{'opcao_texto': 'MVC', 'votos': 5}, {'opcao_texto': 'MVT', 'votos': 35}]
    )

    criar_questao(
        'Como se processa a atualização da estrutura da BD de acordo com os modelos em Django?',
        [['makemigrations e migrate', 40], ['django-admin startproject', 2], ['startapp', 1], ['settings.py', 4]]
    )

    criar_questao(
        'De que classe base deve derivar o modelo de dados em Django para criar uma tabela na BD?',
        [{'opcao_texto': 'django.models.Base', 'votos': 2}, {'opcao_texto': 'models.Model', 'votos': 38},
         {'opcao_texto': 'django.db.Model', 'votos': 4}, {'opcao_texto': 'models.Class', 'votos': 1}]
    )
    print("Testes alínea b) concluídos com sucesso!\n")


# c) Apagar todas as questões da BD
def apagar_todas():
    questoes = Questao.objects.all()
    for questao in questoes:
        questao.delete()
    print("Todas as questões foram apagadas.")


# d) Mostrar uma questão com as suas opções e votos
def mostrar_questao(questao):
    print("Questão: " + questao.questao_texto)
    opcoes = questao.opcao_set.all()
    for opcao in opcoes:
        print("  - " + opcao.opcao_texto + " : " + str(opcao.votos) + " votos")


# e) Mostrar todas as questões em BD, recorrendo à alínea anterior
def mostrar_todas_questoes():
    print("\n=== Alínea e) Todas as questões na BD ===")
    for questao in Questao.objects.all():
        mostrar_questao(questao)
        print("---")


# f) Mostrar as questões cujo texto começa com um prefixo
def mostrar_questoes_por_prefixo(prefixo):
    print(f"\n=== Alínea f) Questões a começar por '{prefixo}' ===")
    questoes = Questao.objects.filter(questao_texto__startswith=prefixo)
    for questao in questoes:
        mostrar_questao(questao)
        print("---")


# g) Mostrar apenas a opção com mais votos de uma questão
def mostrar_opcao_mais_votada(questao):
    print("Questão: " + questao.questao_texto)
    opcoes = questao.opcao_set.all()

    if opcoes.exists():
        # Descobre qual é o valor máximo de votos dentro destas opções
        max_votos = max(opcao.votos for opcao in opcoes)

        # Faz um print apenas das opções que têm esse valor máximo (resolve a questão dos empates)
        for opcao in opcoes.filter(votos=max_votos):
            print("  -> VENCEDORA: " + opcao.opcao_texto + " : " + str(opcao.votos) + " votos")
    else:
        print("  - Esta questão não tem opções.")


# h Obter o número total de votos registados na BD, iterando sobre todas as opções registadas.
def total_votos():
    questoes = Questao.objects.all()
    total_votos_bd = 0

    for questao in questoes:
        total_votos_bd += sum(opcao.votos for opcao in questao.opcao_set.all())

    print("Número total de votos registados: " + str(total_votos_bd))
    return total_votos_bd


# --- Execução Automática e Testes Combinados ---

# 1. Apagar tudo para garantir que os testes não acumulam lixo na base de dados
apagar_todas()

# 2. Executar alínea b (que usa a alínea a) para povoar a base de dados
testar_alinea_b()

# 3. Testar a alínea d) mostrando a primeira questão inserida
print("\n=== Teste mostrar_questao ===")
q = Questao.objects.first()
if q:
    mostrar_questao(q)

# 4. Testar a alínea e)
mostrar_todas_questoes()

# 5. Testar a alínea f)
mostrar_questoes_por_prefixo("Qual")

# 6. Testar alínea g)
print("\n=== Teste alínea g) Opção mais votada por questão ===")
for q in Questao.objects.all():
    mostrar_opcao_mais_votada(q)

# 7. Testar alínea h)
print("\n=== Teste total_votos ===")
total_votos()
