<template>
    <Carregando v-if="carregando" />
    <h1 class="titulo">Histórico de Buscas</h1>
    <div v-if="mensagens.error" class="mensagem mensagemErro">{{ mensagens.error }}</div>
    <div v-if="mensagens.warning" class="mensagem mensagemWarning">{{ mensagens.warning }}</div>
    <div class="conteudoHistorico" >
        <!-- v-if="!carregando && dadosHistorico.length > 0" -->
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
                    <td>{{ item.descricaoBusca }}</td>
                    <td>{{ item.dataBusca }}</td>
                </tr>
                <tr>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                </tr>
                <tr>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                </tr>
                <tr>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                </tr>
                <tr>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                    <td>aaaaaa</td>
                </tr>
            </tbody>
       </table>
    </div>
    <div v-if="dadosHistorico.length === 0 && !carregando" class="mensagem mensagemWarning">Nenhum histórico encontrado.</div>
    <button type="button" id="voltar" class="btn" @click="$router.go(-1)">Voltar</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Carregando from './Carregando.vue';
    import { useFuncoes } from '../composables/useFuncoes';
    import '../../css/noticias.css';

    const {mensagens, tratamentoErro} = useFuncoes();
    const route = useRoute();
    const id = route.params.id;

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

            dadosHistorico.value = body;
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