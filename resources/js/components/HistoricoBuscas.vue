<template>
    <h1 class="titulo">Histórico de Buscas</h1>
    <Carregando v-if="carregando" />
    <div v-if="mensagens.error" class="mensagem mensagemErro">{{ mensagens.error }}</div>
    <div v-if="mensagens.warning" class="mensagem mensagemWarning">{{ mensagens.warning }}</div>
    <div class="conteudoHistorico" v-if="!carregando && dadosHistorico.length > 0">
       <table class="tabelaHistorico">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição da busca</th>
                    <th>Data da Busca</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dadosHistorico" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ formatarData(item.data_busca, 'local')}}</td>
                </tr>
            </tbody>
       </table>
    </div>
    <div v-if="dadosHistorico.length === 0 && !carregando" class="mensagem mensagemWarning">Nenhum histórico encontrado.</div>
    <button type="button" id="voltar" class="btn" @click="$router.go(-1)">Voltar</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Carregando from './Carregando.vue';
    import { useFuncoes } from '../composables/useFuncoes';
    import '../../css/noticias.css';

    const {mensagens, tratamentoErro, formatarData} = useFuncoes();
    const dadosHistorico = ref([]);
    const carregando = ref(true);

    async function buscarHistorico() {
        carregando.value = true;
        mensagens.value.warning = '';
        mensagens.value.error = '';

       fetch('/api/buscarHistorico', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if(status !== 200 && status !== 'ok'){
                tratamentoErro(status, body);
                return;
            }
          
            dadosHistorico.value = body.dados;
        })
        .catch(error => {
            tratamentoErro(error.status, error);
        }).finally(() => {
            carregando.value = false;
        });
    }

    onMounted(() => {
        buscarHistorico();
    })
</script>