import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Noticias from '../components/Noticias.vue';
import Destaque from '../components/Destaque.vue';
import NoticiaDetalhes from '../components/NoticiaDetalhes.vue';
import HistoricoBuscas from '../components/HistoricoBuscas.vue';

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '', // rota padrão dentro de Home (quando acessar '/')
                component: Destaque
            },
            {
                path: 'destaques', // você pode até remover essa se quiser
                component: Destaque
            },
            {
                path: 'noticias',
                component: Noticias
            },
            {
                path: 'noticiaDetalhes/:id',
                name: 'noticiaDetalhes',
                component: NoticiaDetalhes
            },
            {
                path: 'historico',
                component: HistoricoBuscas
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;