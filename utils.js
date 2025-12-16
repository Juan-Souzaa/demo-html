/**
 * Funções utilitárias
 */

const Utils = {
    /**
     * Formata data para exibição (dd/mm/yyyy)
     */
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },
    
    /**
     * Formata data e hora para exibição (dd/mm/yyyy - HH:mm)
     */
    formatDateTime(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    },
    
    /**
     * Calcula diferença de dias entre duas datas
     */
    diffInDays(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = d2 - d1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },
    
    /**
     * Verifica se data está vencida
     */
    isVencida(dateString) {
        if (!dateString) return false;
        const date = new Date(dateString);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < hoje;
    },
    
    /**
     * Formata valor monetário (R$)
     */
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    },
    
    /**
     * Mostra mensagem de sucesso
     */
    showSuccess(message) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: message,
            timer: 3000,
            showConfirmButton: false
        });
    },
    
    /**
     * Mostra mensagem de erro
     */
    showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: message
        });
    },
    
    /**
     * Confirma ação
     */
    confirm(message, callback) {
        Swal.fire({
            title: 'Tem certeza?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    },
    
    /**
     * Limita texto
     */
    limitText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
};


