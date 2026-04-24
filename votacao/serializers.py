from rest_framework import serializers
from .models import Questao, Opcao

class QuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questao
        fields = ('id', 'questao_texto', 'pub_data')

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('id', 'questao', 'opcao_texto', 'votos')