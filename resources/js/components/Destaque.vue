<template>
    <h1 class="titulo">Notícias - NewsAPI - Destaque</h1>
    <Carregando v-if="carregando" />
    <div v-if="!carregando" class="conteudoNoticiasDestaque">
        <div v-for="(item, index) in dadosNoticiasDestaque" :key="index">
            <router-link :to="{ name: 'noticiaDetalhes', params: { id: item.title } }" class="noticiaDestaque">
                <h3>{{ truncateText(item.title,40) }}</h3>
                <div class="conteudoImg">
                    <img :src="item.urlToImage" :alt="item.title" width="250" height="180" />
                </div>
                <p>{{ truncateText(item.description,60) }}</p>
            </router-link>
        </div>
    </div>
    <router-link to="/noticias" v-if="!carregando">
        <button type="button" id="visualizarTodasNoticias" class="btn">Visualizar todas as Notícias</button>
    </router-link>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useFuncoes } from '../composables/useFuncoes';
    import Carregando from './Carregando.vue';
    import '../../css/noticias.css'

    const token = import.meta.env.VITE_API_TOKEN;
    const dadosNoticiasDestaque = ref([]);
    const carregando = ref(true);
    const {mensagens, truncateText, tratamentoErro} = useFuncoes();

    async function buscarDadosDestaque() {
        carregando.value = true;
        mensagens.value.warning = '';
        mensagens.value.error = '';

        try {
            const [response] = await Promise.all([
                fetch(`https://newsapi.org/v2/everything?q=bitcoin&language=pt&sortBy=popularity&pageSize=5`, {
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

            dadosNoticiasDestaque.value = resultado.articles;
        } catch (e) {
            tratamentoErro(e.status, e);
        } finally {
            carregando.value = false;
        }
    }

    onMounted(() => {
        buscarDadosDestaque();
    })
    
</script>