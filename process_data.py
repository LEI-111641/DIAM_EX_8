from votacao.models import Questao, Opcao
from django.utils import timezone


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


# g mostra apenas a questão que tiver o maior número de votos, em caso de igualdade exibe todas as questões empatadas.
def mostrar_questao_com_mais_votos():
    questoes = Questao.objects.all()
    max_votos = 0
    questoes_com_mais_votos = []

    for questao in questoes:
        total_votos = sum(opcao.votos for opcao in questao.opcao_set.all())
        if total_votos > max_votos:
            max_votos = total_votos
            questoes_com_mais_votos = [questao]
        elif total_votos == max_votos:
            questoes_com_mais_votos.append(questao)

    print("Questão(s) com mais votos (" + str(max_votos) + " votos):")
    for questao in questoes_com_mais_votos:
        mostrar_questao(questao)


# h Obter o número total de votos registados na BD, iterando sobre todas as opções registadas.
def total_votos():
    questoes = Questao.objects.all()
    total_votos = 0

    for questao in questoes:
        total_votos += sum(opcao.votos for opcao in questao.opcao_set.all())

    print("Número total de votos registados: " + str(total_votos))
    return total_votos


# --- Testes ---
# Criar dados temporários para testar
q = Questao.objects.create(questao_texto="Qual a melhor UC?", pub_data=timezone.now())
q.opcao_set.create(opcao_texto="DIAM", votos=10)
q.opcao_set.create(opcao_texto="POO", votos=5)
q.opcao_set.create(opcao_texto="IP", votos=3)

# Testar d)
print("=== Teste mostrar_questao ===")
mostrar_questao(q)

# Testar c)
print("\n=== Teste apagar_todas ===")
apagar_todas()
print(Questao.objects.all())

#criar novas questões para testar g) e h)
q1 = Questao.objects.create(questao_texto="Qual a melhor linguagem de programação?", pub_data=timezone.now())
q1.opcao_set.create(opcao_texto="Python", votos=10)
q1.opcao_set.create(opcao_texto="Java", votos=20)
q1.opcao_set.create(opcao_texto="C++", votos=2)

q2 = Questao.objects.create(questao_texto="Qual a melhor framework?", pub_data=timezone.now())
q2.opcao_set.create(opcao_texto="Django", votos=15)
q2.opcao_set.create(opcao_texto="Flask", votos=15)
q2.opcao_set.create(opcao_texto="Express", votos=5)

# testar g)
print("\n=== Teste mostrar_questao_com_mais_votos ===")
mostrar_questao_com_mais_votos()


# testar h)
print("\n=== Teste total_votos ===")
total_votos()
