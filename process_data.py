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