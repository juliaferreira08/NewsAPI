<template>
    <h1 class="titulo">Notícias - NewsAPI</h1>
    <div v-if="mensagens.error" class="mensagem mensagemErro">{{ mensagens.error }}</div>
    <div v-if="mensagens.warning" class="mensagem mensagemWarning">{{ mensagens.warning }}</div>
    <!-- Filtros -->
    <h3 class="titulo subtitulo">Filtros</h3>
    <div class="filtros">
        <div>
            <label for="descricao">Título ou Descrição:</label>
            <input type="text" id="descricao" placeholder="Pesquise pelo título ou descrição da notícia" v-model="descricaoFiltro" class="inputPadrao"/>
        </div>
        <div>
            <label for="idioma">Idioma das Notícias:</label>
            <select name="idioma" id="idioma" class="inputPadrao" v-model="idiomaFiltro">
                <option value="pt">Português</option>
                <option value="ar">Árabe</option>
                <option value="de">Alemão</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
                <option value="fr">Francês</option>
                <option value="he">Hebraico</option>
                <option value="it">Italiano</option>
                <option value="nl">Holandês</option>
                <option value="no">Norueguês</option>
                <option value="ru">Russo</option>
                <option value="sv">Sueco</option>
                <option value="ud">UD (desconhecido)</option>
                <option value="zh">Chinês</option>
            </select>
        </div>
        <div>
            <label for="itensPorPagina">Nº de Itens por página:</label>
            <select id="itensPorPagina" class="inputPadrao" v-model="itensPorPagina">
                <option value="12">12</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
            </select>
        </div>
        <div><button id="filtrar" class="btn" type="button" @click="buscarDados()">Filtrar</button></div>
    </div>
    <Carregando v-if="carregando" />
    <!-- Listagem de Notícias -->
    <div v-if="!carregando" class="dadosNoticias">
        <div class="conteudoNoticias" v-if="dadosNoticias.length > 0">
            <div v-for="(item, index) in itensPaginaAtual" :key="index" :title="item.description" class="noticia">
                <h3>{{ truncateText(item.title, 40) }}</h3>
                <div class="conteudoImg">
                    <img :src="item.urlToImage ? item.urlToImage : '../../../public/images/semImagem.svg'" :alt="item.title" width="200" height="200"/>
                </div>
                <p>{{ truncateText(item.description, 65) }}</p>
                <router-link :to="{ name: 'noticiaDetalhes', params: { id: item.title } }" class="btn">Visualizar Notícia Completa</router-link>
            </div>
        </div>
        <div class="paginacao" v-if="dadosNoticias.length > 0">
            <button @click="paginaAtual--" :disabled="paginaAtual === 1" class="btn">Anterior</button>
            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
            <button @click="paginaAtual++" :disabled="paginaAtual === totalPaginas" class="btn">Próximo</button>
        </div>
    </div>
    <div v-if="dadosNoticias.length === 0 && !carregando" class="mensagem mensagemWarning">Nenhuma notícia encontrada para os filtros aplicados.</div>
</template>
<meta name="csrf-token" content="{{ csrf_token() }}"/>
<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useFuncoes } from '../composables/useFuncoes';
    import Carregando from './Carregando.vue';
    import '../../css/noticias.css';

    const dadosNoticias = ref([]);
    const carregando = ref(true);
    const totalNoticias = ref(0);
    const descricaoFiltro = ref('bitcoin');
    const itensPorPagina = ref(12);
    const idiomaFiltro = ref('pt');
    const {mensagens, truncateText, tratamentoErro} = useFuncoes();

    // paginação
    const paginaAtual = ref(1);

    const totalPaginas = computed(() => 
        Math.ceil(dadosNoticias.value.length / itensPorPagina.value)
    );

    const itensPaginaAtual = computed(() => {
        const start = (paginaAtual.value - 1) * itensPorPagina.value;
        return dadosNoticias.value.slice(start, start + itensPorPagina.value);
    })

    // busca notícias da API NewsAPI
    async function buscarDados() {
        mensagens.value.warning = '';
        mensagens.value.error = '';
        dadosNoticias.value = [];

        if(!descricaoFiltro.value) {
            mensagens.value.warning = 'Por favor, digite uma palavra-chave para buscar as notícias.';
            return;
        }

        carregando.value = true;

        try {
            const [response] = await Promise.all([
                fetch(`https://newsapi.org/v2/everything?q=${descricaoFiltro.value}&language=${idiomaFiltro.value}`, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': 'd976cecbd3d24f20b2e80782bc958d79'
                    }
                }),
            ])

            const status = response.status;
            const resultado = await response.json();

            if(status !== 200 && status !== 'ok'){
                tratamentoErro(status, resultado);
                return;
            }

            dadosNoticias.value = resultado.articles;
            totalNoticias.value = resultado.totalResults;

            salvarBusca();
        } catch (e) {
            tratamentoErro(e.status, e);
        } finally {
            carregando.value = false;
        }
    }

    // Salvar uma nova busca
    function salvarBusca() {
        fetch('/api/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ descricao: descricaoFiltro.value })
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            // Não exibo mensagem caso tenha dado certo
            if (status !== 201) {
                tratamentoErro(status, body);
            }
        })
        .catch(error => {
            tratamentoErro(error.status, error);
        });
    }

    // se alterar o idioma, a requisição na api é feita novamente
    watch(idiomaFiltro, () => {
        buscarDados()
    })

    // se alterar o filtro de itens por pagina, volta para a página 1
    watch(itensPorPagina, () => {
        paginaAtual.value = 1;
    })

    onMounted(() => {
        buscarDados();
    })
</script>