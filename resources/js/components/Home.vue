<template>
    <nav class="menu">
        <ul>
            <!-- <li><img src="../../../public/images/imgNoticias.png" alt="Notícias" width="90" height="90"/></li> -->
            <!-- <li class="tituloNoticia">Notícias</li> -->
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/noticias">Notícias</router-link></li>
            <li><router-link to="/historico">Histórico de Pesquisa</router-link></li>
        </ul>
    </nav>
    <div class="conteudo">
        <router-view></router-view>
    </div>
</template>

<script>
    import '../../css/noticias.css';

    export default {
        name: 'Home'
    }
</script>