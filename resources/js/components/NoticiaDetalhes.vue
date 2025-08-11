<template>
    <Carregando v-if="carregando" />
    <div v-if="mensagens.error" class="mensagem mensagemErro">{{ mensagens.error }}</div>
    <div v-if="mensagens.warning" class="mensagem mensagemWarning">{{ mensagens.warning }}</div>
    <div class="conteudoDetalheNoticia" v-if="!carregando && dadosNoticia">
        <h1 class="titulo">{{dadosNoticia.title}}</h1>
        <img :src="dadosNoticia.urlToImage" :alt="dadosNoticia.title" width="500" height="500"></img>
        <p><i>{{ formatarData(dadosNoticia.publishedAt) }}</i></p>
        <p>{{ dadosNoticia.description }}</p>
        <p><i><b>Link da matéria:</b> <a :href="dadosNoticia.url" target="_blank">{{ dadosNoticia.url }}</a></i></p>
    </div>
    <div v-if="!dadosNoticia" class="mensagem mensagemWarning">Nenhuma notícia encontrada.</div>
    <button type="button" id="voltar" class="btn" @click="$router.go(-1)">Voltar</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Carregando from './Carregando.vue';
    import { useFuncoes } from '../composables/useFuncoes';
    import '../../css/noticias.css';

    const token = import.meta.env.VITE_API_TOKEN;
    const {mensagens, tratamentoErro, formatarData} = useFuncoes();
    const route = useRoute();
    const id = route.params.id;

    const dadosNoticia = ref([]);
    const carregando = ref(true);

    async function buscarDadosNoticia() {
        carregando.value = true;
        mensagens.value.warning = '';
        mensagens.value.error = '';

        try {
            const [response] = await Promise.all([
                fetch(`https://newsapi.org/v2/everything?q="${id}"&language=pt`, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': token
                    }
                }),
            ])

            const status = response.status;
            const resultado = await response.json();

            if(status !== 200 && status !== 'ok'){
                tratamentoErro(status, resultado);
                return;
            }
            
            dadosNoticia.value = resultado.articles[0];
        } catch (e) {
            tratamentoErro(e.status, e);
        } finally {
            carregando.value = false;
        }
    }

    onMounted(() => {
        buscarDadosNoticia();
    })
</script>