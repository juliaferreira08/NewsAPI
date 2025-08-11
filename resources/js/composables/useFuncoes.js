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

    function formatarData(dataISO) {
        const data = new Date(dataISO)

        const dia = String(data.getUTCDate()).padStart(2, '0')
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
        const ano = data.getUTCFullYear()

        const horas = String(data.getUTCHours()).padStart(2, '0')
        const minutos = String(data.getUTCMinutes()).padStart(2, '0')
        const segundos = String(data.getUTCSeconds()).padStart(2, '0')

        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
    }

    return {
        mensagens,
        truncateText,
        tratamentoErro,
        formatarData
    }
}