/**
 * Sistema de Autenticação
 * Gerencia login, registro e sessão do usuário
 */

class Auth {
    static STORAGE_KEY = 'semear_current_user';
    
    /**
     * Faz login do usuário
     */
    static login(email, password) {
        const user = DatabaseManager.getUserByEmail(email);
        
        if (!user) {
            return { success: false, message: 'Usuário não encontrado' };
        }
        
        // Em produção, deveria comparar hash da senha
        if (user.password !== password) {
            return { success: false, message: 'Senha incorreta' };
        }
        
        // Salvar usuário atual
        const userData = { ...user };
        delete userData.password; // Não salvar senha na sessão
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
        
        return { success: true, user: userData };
    }
    
    /**
     * Registra novo usuário
     */
    static register(name, email, password) {
        // Verificar se email já existe
        const existingUser = DatabaseManager.getUserByEmail(email);
        if (existingUser) {
            return { success: false, message: 'Email já cadastrado' };
        }
        
        // Criar novo usuário
        const newUser = DatabaseManager.createUser({
            name,
            email,
            password
        });
        
        // Fazer login automático
        const userData = { ...newUser };
        delete userData.password;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
        
        return { success: true, user: userData };
    }
    
    /**
     * Faz logout do usuário
     */
    static logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        return true;
    }
    
    /**
     * Retorna o usuário atual logado
     */
    static getCurrentUser() {
        const userData = localStorage.getItem(this.STORAGE_KEY);
        return userData ? JSON.parse(userData) : null;
    }
    
    /**
     * Verifica se há usuário logado
     */
    static isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
    
    /**
     * Verifica se o usuário tem permissão
     */
    static hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;
        
        // Por enquanto, todos os usuários têm todas as permissões
        // Em produção, verificar roles e permissions
        return true;
    }
}


