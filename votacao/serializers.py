from rest_framework import serializers
from .models import Questao, Opcao, Comentario

class QuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questao
        fields = ('id', 'questao_texto', 'pub_data')

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('id', 'questao', 'opcao_texto', 'votos')

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ('id', 'questao', 'texto', 'autor', 'data')