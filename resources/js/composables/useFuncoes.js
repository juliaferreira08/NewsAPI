import { ref } from 'vue'

export function useFuncoes() {
    const mensagens = ref({ warning: '', error: '' })

    function truncateText(text, maxLength) {
        if (!text) return ''
        if (text.length <= maxLength) return text
        return text.substr(0, maxLength) + '...'
    }

   function tratamentoErro(status, error){
        if(status === 500){ // exibe a mensagem como um warning
            mensagens.value.error = 'Erro ao carregar dados: ' + error.message;
        }else{ // exibe a mensagem como um erro
            mensagens.value.warning = error.message;
        }
    }

    function formatarData(dataISO, formato = 'UTC') {
        //const data = new Date(dataISO);
        const data = formato === 'UTC' ? new Date(dataISO) : new Date(dataISO.replace(' ', 'T') + 'Z');

        let dia, mes, ano;
        let horas, minutos, segundos;

        if(formato === 'UTC'){
            dia = String(data.getUTCDate()).padStart(2, '0');
            mes = String(data.getUTCMonth() + 1).padStart(2, '0');
            ano = data.getUTCFullYear();

            horas = String(data.getUTCHours()).padStart(2, '0');
            minutos = String(data.getUTCMinutes()).padStart(2, '0');
            segundos = String(data.getUTCSeconds()).padStart(2, '0');
        } else {
            dia = String(data.getDate()).padStart(2, '0');
            mes = String(data.getMonth() + 1).padStart(2, '0'); 
            ano = data.getFullYear();

            horas = String(data.getHours()).padStart(2, '0');
            minutos = String(data.getMinutes()).padStart(2, '0');
            segundos = String(data.getSeconds()).padStart(2, '0');
        }

        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    }

    return {
        mensagens,
        truncateText,
        tratamentoErro,
        formatarData
    }
}