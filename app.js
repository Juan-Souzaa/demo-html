/**
 * DatabaseManager - Sistema de gerenciamento de dados usando localStorage
 * Simula um banco de dados completo com todas as entidades do sistema
 */

class DatabaseManager {
    static STORAGE_KEY = 'semear_database';
    
    /**
     * Inicializa o banco de dados se não existir
     */
    static initialize() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            const initialData = {
                users: [],
                atividades: [],
                obrigacoes: [],
                reunioes: [],
                atas: [],
                decisoes: [],
                participantesReuniao: [],
                lembretesReuniao: [],
                tarefas: [],
                roles: [],
                permissions: [],
                currentUser: null
            };
            this.save(initialData);
        }
    }
    
    /**
     * Verifica se o banco está inicializado
     */
    static isInitialized() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }
    
    /**
     * Carrega todos os dados do localStorage
     */
    static load() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    }
    
    /**
     * Salva todos os dados no localStorage
     */
    static save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    
    /**
     * Gera um ID único
     */
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // ========== USERS ==========
    static getUsers() {
        return this.load().users || [];
    }
    
    static getUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    }
    
    static getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    }
    
    static createUser(userData) {
        const data = this.load();
        const newUser = {
            id: this.generateId(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // Em produção, deveria ser hash
            canManagePermissions: userData.canManagePermissions || false,
            role_ids: userData.role_ids || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.users.push(newUser);
        this.save(data);
        return newUser;
    }
    
    static updateUser(id, userData) {
        const data = this.load();
        const userIndex = data.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            data.users[userIndex] = {
                ...data.users[userIndex],
                ...userData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.users[userIndex];
        }
        return null;
    }
    
    // ========== ATIVIDADES ==========
    static getAtividades() {
        return this.load().atividades || [];
    }
    
    static getAtividadeById(id) {
        const atividades = this.getAtividades();
        return atividades.find(a => a.id === id);
    }
    
    static createAtividade(atividadeData) {
        const data = this.load();
        const newAtividade = {
            id: this.generateId(),
            titulo: atividadeData.titulo,
            descricao: atividadeData.descricao || '',
            tipo: atividadeData.tipo,
            data_inicio: atividadeData.data_inicio,
            data_fim: atividadeData.data_fim || null,
            status: atividadeData.status || 'planejada',
            local: atividadeData.local || '',
            responsavel_id: atividadeData.responsavel_id || null,
            orcamento: atividadeData.orcamento || 0,
            observacoes: atividadeData.observacoes || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.atividades.push(newAtividade);
        this.save(data);
        return newAtividade;
    }
    
    static updateAtividade(id, atividadeData) {
        const data = this.load();
        const atividadeIndex = data.atividades.findIndex(a => a.id === id);
        if (atividadeIndex !== -1) {
            data.atividades[atividadeIndex] = {
                ...data.atividades[atividadeIndex],
                ...atividadeData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.atividades[atividadeIndex];
        }
        return null;
    }
    
    static deleteAtividade(id) {
        const data = this.load();
        data.atividades = data.atividades.filter(a => a.id !== id);
        this.save(data);
        return true;
    }
    
    // ========== OBRIGACOES ==========
    static getObrigacoes() {
        return this.load().obrigacoes || [];
    }
    
    static getObrigacaoById(id) {
        const obrigacoes = this.getObrigacoes();
        return obrigacoes.find(o => o.id === id);
    }
    
    static createObrigacao(obrigacaoData) {
        const data = this.load();
        const newObrigacao = {
            id: this.generateId(),
            titulo: obrigacaoData.titulo,
            descricao: obrigacaoData.descricao || '',
            tipo: obrigacaoData.tipo,
            data_vencimento: obrigacaoData.data_vencimento,
            data_lembrete: obrigacaoData.data_lembrete || null,
            status: obrigacaoData.status || 'pendente',
            prioridade: obrigacaoData.prioridade || 'media',
            responsavel_id: obrigacaoData.responsavel_id || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.obrigacoes.push(newObrigacao);
        this.save(data);
        return newObrigacao;
    }
    
    static updateObrigacao(id, obrigacaoData) {
        const data = this.load();
        const obrigacaoIndex = data.obrigacoes.findIndex(o => o.id === id);
        if (obrigacaoIndex !== -1) {
            data.obrigacoes[obrigacaoIndex] = {
                ...data.obrigacoes[obrigacaoIndex],
                ...obrigacaoData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.obrigacoes[obrigacaoIndex];
        }
        return null;
    }
    
    static deleteObrigacao(id) {
        const data = this.load();
        data.obrigacoes = data.obrigacoes.filter(o => o.id !== id);
        this.save(data);
        return true;
    }
    
    // ========== REUNIOES ==========
    static getReunioes() {
        return this.load().reunioes || [];
    }
    
    static getReuniaoById(id) {
        const reunioes = this.getReunioes();
        return reunioes.find(r => r.id === id);
    }
    
    static createReuniao(reuniaoData) {
        const data = this.load();
        const newReuniao = {
            id: this.generateId(),
            titulo: reuniaoData.titulo,
            descricao: reuniaoData.descricao || '',
            tipo: reuniaoData.tipo,
            data_hora: reuniaoData.data_hora,
            local: reuniaoData.local || '',
            status: reuniaoData.status || 'agendada',
            organizador_id: reuniaoData.organizador_id || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.reunioes.push(newReuniao);
        this.save(data);
        return newReuniao;
    }
    
    static updateReuniao(id, reuniaoData) {
        const data = this.load();
        const reuniaoIndex = data.reunioes.findIndex(r => r.id === id);
        if (reuniaoIndex !== -1) {
            data.reunioes[reuniaoIndex] = {
                ...data.reunioes[reuniaoIndex],
                ...reuniaoData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.reunioes[reuniaoIndex];
        }
        return null;
    }
    
    static deleteReuniao(id) {
        const data = this.load();
        data.reunioes = data.reunioes.filter(r => r.id !== id);
        // Deletar participantes relacionados
        data.participantesReuniao = data.participantesReuniao.filter(p => p.reuniao_id !== id);
        // Deletar lembretes relacionados
        data.lembretesReuniao = data.lembretesReuniao.filter(l => l.reuniao_id !== id);
        // Deletar atas relacionadas
        data.atas = data.atas.filter(a => a.reuniao_id !== id);
        // Deletar decisões relacionadas
        data.decisoes = data.decisoes.filter(d => d.reuniao_id !== id);
        this.save(data);
        return true;
    }
    
    // ========== PARTICIPANTES REUNIAO ==========
    static getParticipantesReuniao(reuniaoId) {
        const participantes = this.load().participantesReuniao || [];
        return participantes.filter(p => p.reuniao_id === reuniaoId);
    }
    
    static addParticipanteReuniao(reuniaoId, userId) {
        const data = this.load();
        const exists = data.participantesReuniao.find(
            p => p.reuniao_id === reuniaoId && p.user_id === userId
        );
        if (!exists) {
            const newParticipante = {
                id: this.generateId(),
                reuniao_id: reuniaoId,
                user_id: userId,
                confirmado: false,
                created_at: new Date().toISOString()
            };
            data.participantesReuniao.push(newParticipante);
            this.save(data);
            return newParticipante;
        }
        return exists;
    }
    
    static removeParticipanteReuniao(reuniaoId, userId) {
        const data = this.load();
        data.participantesReuniao = data.participantesReuniao.filter(
            p => !(p.reuniao_id === reuniaoId && p.user_id === userId)
        );
        this.save(data);
        return true;
    }
    
    static confirmarPresenca(reuniaoId, userId) {
        const data = this.load();
        const participante = data.participantesReuniao.find(
            p => p.reuniao_id === reuniaoId && p.user_id === userId
        );
        if (participante) {
            participante.confirmado = true;
            this.save(data);
            return participante;
        }
        return null;
    }
    
    // ========== LEMBRETES REUNIAO ==========
    static getLembretesReuniao(reuniaoId) {
        const lembretes = this.load().lembretesReuniao || [];
        return lembretes.filter(l => l.reuniao_id === reuniaoId);
    }
    
    static createLembreteReuniao(reuniaoId, tipo) {
        const data = this.load();
        const newLembrete = {
            id: this.generateId(),
            reuniao_id: reuniaoId,
            tipo: tipo,
            enviado: false,
            created_at: new Date().toISOString()
        };
        data.lembretesReuniao.push(newLembrete);
        this.save(data);
        return newLembrete;
    }
    
    static deleteLembreteReuniao(id) {
        const data = this.load();
        data.lembretesReuniao = data.lembretesReuniao.filter(l => l.id !== id);
        this.save(data);
        return true;
    }
    
    // ========== ATAS ==========
    static getAtas() {
        return this.load().atas || [];
    }
    
    static getAtaById(id) {
        const atas = this.getAtas();
        return atas.find(a => a.id === id);
    }
    
    static getAtasByReuniao(reuniaoId) {
        const atas = this.getAtas();
        return atas.filter(a => a.reuniao_id === reuniaoId);
    }
    
    static createAta(ataData) {
        const data = this.load();
        const newAta = {
            id: this.generateId(),
            reuniao_id: ataData.reuniao_id,
            conteudo: ataData.conteudo || '',
            aprovada: false,
            criado_por_id: ataData.criado_por_id || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.atas.push(newAta);
        this.save(data);
        return newAta;
    }
    
    static updateAta(id, ataData) {
        const data = this.load();
        const ataIndex = data.atas.findIndex(a => a.id === id);
        if (ataIndex !== -1) {
            data.atas[ataIndex] = {
                ...data.atas[ataIndex],
                ...ataData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.atas[ataIndex];
        }
        return null;
    }
    
    static aprovarAta(id) {
        return this.updateAta(id, { aprovada: true });
    }
    
    // ========== DECISOES ==========
    static getDecisoes() {
        return this.load().decisoes || [];
    }
    
    static getDecisaoById(id) {
        const decisoes = this.getDecisoes();
        return decisoes.find(d => d.id === id);
    }
    
    static getDecisoesByReuniao(reuniaoId) {
        const decisoes = this.getDecisoes();
        return decisoes.filter(d => d.reuniao_id === reuniaoId);
    }
    
    static createDecisao(decisaoData) {
        const data = this.load();
        const newDecisao = {
            id: this.generateId(),
            reuniao_id: decisaoData.reuniao_id,
            titulo: decisaoData.titulo,
            descricao: decisaoData.descricao || '',
            responsavel_id: decisaoData.responsavel_id || null,
            prazo: decisaoData.prazo || null,
            status: decisaoData.status || 'pendente',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.decisoes.push(newDecisao);
        this.save(data);
        return newDecisao;
    }
    
    static updateDecisao(id, decisaoData) {
        const data = this.load();
        const decisaoIndex = data.decisoes.findIndex(d => d.id === id);
        if (decisaoIndex !== -1) {
            data.decisoes[decisaoIndex] = {
                ...data.decisoes[decisaoIndex],
                ...decisaoData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.decisoes[decisaoIndex];
        }
        return null;
    }
    
    static deleteDecisao(id) {
        const data = this.load();
        data.decisoes = data.decisoes.filter(d => d.id !== id);
        this.save(data);
        return true;
    }
    
    // ========== TAREFAS ==========
    static getTarefas() {
        return this.load().tarefas || [];
    }
    
    static getTarefaById(id) {
        const tarefas = this.getTarefas();
        return tarefas.find(t => t.id === id);
    }
    
    // ========== ROLES E PERMISSIONS ==========
    static getRoles() {
        return this.load().roles || [];
    }
    
    static getRoleById(id) {
        const roles = this.getRoles();
        return roles.find(r => r.id === id);
    }
    
    static createRole(roleData) {
        const data = this.load();
        const newRole = {
            id: this.generateId(),
            name: roleData.name,
            guard_name: roleData.guard_name || 'web',
            permissions: roleData.permissions || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.roles.push(newRole);
        this.save(data);
        return newRole;
    }
    
    static updateRole(id, roleData) {
        const data = this.load();
        const roleIndex = data.roles.findIndex(r => r.id === id);
        if (roleIndex !== -1) {
            data.roles[roleIndex] = {
                ...data.roles[roleIndex],
                ...roleData,
                updated_at: new Date().toISOString()
            };
            this.save(data);
            return data.roles[roleIndex];
        }
        return null;
    }
    
    static deleteRole(id) {
        const data = this.load();
        data.roles = data.roles.filter(r => r.id !== id);
        // Remover role dos usuários
        data.users.forEach(user => {
            if (user.role_ids && user.role_ids.includes(id)) {
                user.role_ids = user.role_ids.filter(rid => rid !== id);
            }
        });
        this.save(data);
        return true;
    }
    
    static getPermissions() {
        const data = this.load();
        if (!data.permissions || data.permissions.length === 0) {
            // Criar permissões padrão se não existirem
            const defaultPermissions = [
                { id: 'perm1', name: 'usuarios.view', group: 'usuarios', description: 'Visualizar usuários' },
                { id: 'perm2', name: 'usuarios.create', group: 'usuarios', description: 'Criar usuários' },
                { id: 'perm3', name: 'usuarios.update', group: 'usuarios', description: 'Editar usuários' },
                { id: 'perm4', name: 'usuarios.delete', group: 'usuarios', description: 'Excluir usuários' },
                { id: 'perm5', name: 'atividades.view', group: 'atividades', description: 'Visualizar atividades' },
                { id: 'perm6', name: 'atividades.create', group: 'atividades', description: 'Criar atividades' },
                { id: 'perm7', name: 'atividades.update', group: 'atividades', description: 'Editar atividades' },
                { id: 'perm8', name: 'atividades.delete', group: 'atividades', description: 'Excluir atividades' },
                { id: 'perm9', name: 'obrigacoes.view', group: 'obrigacoes', description: 'Visualizar obrigações' },
                { id: 'perm10', name: 'obrigacoes.create', group: 'obrigacoes', description: 'Criar obrigações' },
                { id: 'perm11', name: 'obrigacoes.update', group: 'obrigacoes', description: 'Editar obrigações' },
                { id: 'perm12', name: 'obrigacoes.delete', group: 'obrigacoes', description: 'Excluir obrigações' },
                { id: 'perm13', name: 'reunioes.view', group: 'reunioes', description: 'Visualizar reuniões' },
                { id: 'perm14', name: 'reunioes.create', group: 'reunioes', description: 'Criar reuniões' },
                { id: 'perm15', name: 'reunioes.update', group: 'reunioes', description: 'Editar reuniões' },
                { id: 'perm16', name: 'reunioes.delete', group: 'reunioes', description: 'Excluir reuniões' },
                { id: 'perm17', name: 'relatorios.view', group: 'relatorios', description: 'Visualizar relatórios' },
                { id: 'perm18', name: 'relatorios.export', group: 'relatorios', description: 'Exportar relatórios' },
                { id: 'perm19', name: 'permissoes.view', group: 'permissoes', description: 'Visualizar permissões' },
                { id: 'perm20', name: 'permissoes.manage', group: 'permissoes', description: 'Gerenciar permissões' }
            ];
            data.permissions = defaultPermissions;
            this.save(data);
        }
        return data.permissions || [];
    }
    
    static assignRoleToUser(userId, roleId) {
        const data = this.load();
        const user = data.users.find(u => u.id === userId);
        if (user) {
            if (!user.role_ids) user.role_ids = [];
            if (!user.role_ids.includes(roleId)) {
                user.role_ids.push(roleId);
                this.save(data);
            }
            return true;
        }
        return false;
    }
    
    static removeRoleFromUser(userId, roleId) {
        const data = this.load();
        const user = data.users.find(u => u.id === userId);
        if (user && user.role_ids) {
            user.role_ids = user.role_ids.filter(rid => rid !== roleId);
            this.save(data);
            return true;
        }
        return false;
    }
    
    static getUserRoles(userId) {
        const user = this.getUserById(userId);
        if (!user || !user.role_ids) return [];
        return user.role_ids.map(roleId => this.getRoleById(roleId)).filter(r => r !== null);
    }
    
    // ========== SEED DATA ==========
    static seed() {
        // Garantir que está inicializado
        if (!this.isInitialized()) {
            this.initialize();
        }
        
        const data = this.load();
        
        // Sempre garantir que roles e permissions existam
        if (!data.roles || data.roles.length === 0) {
            // Criar roles padrão
            const superAdminRole = this.createRole({
                name: 'Super Admin',
                guard_name: 'web',
                permissions: this.getPermissions().map(p => p.id)
            });
            
            this.createRole({
                name: 'Admin',
                guard_name: 'web',
                permissions: ['perm1', 'perm2', 'perm3', 'perm19', 'perm20']
            });
            
            this.createRole({
                name: 'Usuário',
                guard_name: 'web',
                permissions: ['perm5', 'perm9', 'perm13']
            });
        }
        
        // Verificar se já tem usuários
        if (data.users && data.users.length > 0) {
            return; // Já tem dados, não fazer seed de usuários
        }
        
        // Criar usuários de exemplo
        const admin = this.createUser({
            name: 'Administrador',
            email: 'admin@semear.com',
            password: 'admin123',
            canManagePermissions: true
        });
        
        // Buscar role Super Admin
        const superAdminRole = this.getRoles().find(r => r.name === 'Super Admin');
        if (superAdminRole) {
            this.assignRoleToUser(admin.id, superAdminRole.id);
        }
        
        const userRole = this.getRoles().find(r => r.name === 'Usuário');
        
        const user1 = this.createUser({
            name: 'João Silva',
            email: 'joao@semear.com',
            password: '123456'
        });
        
        const user2 = this.createUser({
            name: 'Maria Santos',
            email: 'maria@semear.com',
            password: '123456'
        });
        
        const user3 = this.createUser({
            name: 'Pedro Oliveira',
            email: 'pedro@semear.com',
            password: '123456'
        });
        
        // Atribuir role de Usuário aos usuários comuns
        if (userRole) {
            this.assignRoleToUser(user1.id, userRole.id);
            this.assignRoleToUser(user2.id, userRole.id);
            this.assignRoleToUser(user3.id, userRole.id);
        }
        
        // Criar atividades de exemplo
        const hoje = new Date();
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        const proximaSemana = new Date(hoje);
        proximaSemana.setDate(proximaSemana.getDate() + 7);
        const proximaSemana2 = new Date(hoje);
        proximaSemana2.setDate(proximaSemana2.getDate() + 14);
        const semanaPassada = new Date(hoje);
        semanaPassada.setDate(semanaPassada.getDate() - 7);
        
        this.createAtividade({
            titulo: 'Mutirão de Limpeza',
            descricao: 'Limpeza geral da área comum e organização dos espaços',
            tipo: 'mutirao',
            data_inicio: semanaPassada.toISOString().split('T')[0],
            data_fim: semanaPassada.toISOString().split('T')[0],
            status: 'concluida',
            local: 'Área comum',
            responsavel_id: user1.id,
            orcamento: 500,
            observacoes: 'Atividade realizada com sucesso'
        });
        
        this.createAtividade({
            titulo: 'Workshop de Sustentabilidade',
            descricao: 'Workshop sobre práticas sustentáveis e meio ambiente',
            tipo: 'workshop',
            data_inicio: proximaSemana.toISOString().split('T')[0],
            status: 'planejada',
            local: 'Sala de reuniões',
            responsavel_id: user2.id,
            orcamento: 1000
        });
        
        this.createAtividade({
            titulo: 'Melhoria da Iluminação',
            descricao: 'Instalação de novas lâmpadas LED na área comum',
            tipo: 'melhoria',
            data_inicio: amanha.toISOString().split('T')[0],
            status: 'em_andamento',
            local: 'Área comum',
            responsavel_id: user3.id,
            orcamento: 800
        });
        
        this.createAtividade({
            titulo: 'Evento de Integração',
            descricao: 'Evento para integração dos novos moradores',
            tipo: 'evento',
            data_inicio: proximaSemana2.toISOString().split('T')[0],
            status: 'planejada',
            local: 'Salão de festas',
            responsavel_id: admin.id,
            orcamento: 1500
        });
        
        this.createAtividade({
            titulo: 'Treinamento de Segurança',
            descricao: 'Treinamento sobre segurança e prevenção de acidentes',
            tipo: 'treinamento',
            data_inicio: proximaSemana.toISOString().split('T')[0],
            status: 'planejada',
            local: 'Sala de reuniões',
            responsavel_id: user1.id,
            orcamento: 600
        });
        
        // Criar obrigações de exemplo
        const vencimento1 = new Date(hoje);
        vencimento1.setDate(vencimento1.getDate() + 2);
        const vencimento2 = new Date(hoje);
        vencimento2.setDate(vencimento2.getDate() + 10);
        const vencimento3 = new Date(hoje);
        vencimento3.setDate(vencimento3.getDate() - 3);
        const vencimento4 = new Date(hoje);
        vencimento4.setDate(vencimento4.getDate() + 20);
        
        this.createObrigacao({
            titulo: 'Pagamento de Taxa Mensal',
            descricao: 'Pagamento da taxa mensal de condomínio',
            tipo: 'financeira',
            data_vencimento: vencimento1.toISOString().split('T')[0],
            status: 'pendente',
            prioridade: 'alta',
            responsavel_id: admin.id
        });
        
        this.createObrigacao({
            titulo: 'Renovação de Seguro',
            descricao: 'Renovação do seguro do prédio',
            tipo: 'legal',
            data_vencimento: vencimento2.toISOString().split('T')[0],
            status: 'pendente',
            prioridade: 'media',
            responsavel_id: admin.id
        });
        
        this.createObrigacao({
            titulo: 'Declaração de Imposto',
            descricao: 'Entrega da declaração de imposto de renda',
            tipo: 'legal',
            data_vencimento: vencimento3.toISOString().split('T')[0],
            status: 'vencida',
            prioridade: 'urgente',
            responsavel_id: user1.id
        });
        
        this.createObrigacao({
            titulo: 'Manutenção Preventiva',
            descricao: 'Manutenção preventiva dos elevadores',
            tipo: 'manutencao',
            data_vencimento: vencimento4.toISOString().split('T')[0],
            status: 'pendente',
            prioridade: 'baixa',
            responsavel_id: user2.id
        });
        
        // Criar reuniões de exemplo
        const reuniaoData1 = new Date(hoje);
        reuniaoData1.setDate(reuniaoData1.getDate() + 3);
        reuniaoData1.setHours(14, 0, 0, 0);
        
        const reuniaoData2 = new Date(hoje);
        reuniaoData2.setDate(reuniaoData2.getDate() + 10);
        reuniaoData2.setHours(19, 0, 0, 0);
        
        const reuniaoData3 = new Date(hoje);
        reuniaoData3.setDate(reuniaoData3.getDate() - 5);
        reuniaoData3.setHours(14, 0, 0, 0);
        
        const reuniao1 = this.createReuniao({
            titulo: 'Reunião Mensal',
            descricao: 'Reunião mensal da associação para discussão de assuntos gerais',
            tipo: 'ordinaria',
            data_hora: reuniaoData1.toISOString(),
            local: 'Sala de reuniões',
            status: 'agendada',
            organizador_id: admin.id
        });
        
        const reuniao2 = this.createReuniao({
            titulo: 'Reunião Extraordinária',
            descricao: 'Reunião extraordinária para discussão de melhorias',
            tipo: 'extraordinaria',
            data_hora: reuniaoData2.toISOString(),
            local: 'Sala de reuniões',
            status: 'confirmada',
            organizador_id: user1.id
        });
        
        const reuniao3 = this.createReuniao({
            titulo: 'Reunião de Comissão',
            descricao: 'Reunião da comissão de obras',
            tipo: 'comissao',
            data_hora: reuniaoData3.toISOString(),
            local: 'Sala de reuniões',
            status: 'concluida',
            organizador_id: admin.id
        });
        
        // Adicionar participantes
        this.addParticipanteReuniao(reuniao1.id, user1.id);
        this.addParticipanteReuniao(reuniao1.id, user2.id);
        this.addParticipanteReuniao(reuniao1.id, user3.id);
        this.confirmarPresenca(reuniao1.id, user1.id);
        
        this.addParticipanteReuniao(reuniao2.id, admin.id);
        this.addParticipanteReuniao(reuniao2.id, user2.id);
        this.confirmarPresenca(reuniao2.id, admin.id);
        this.confirmarPresenca(reuniao2.id, user2.id);
        
        // Criar atas de exemplo
        const dataFormatada = reuniaoData3.toLocaleDateString('pt-BR');
        this.createAta({
            reuniao_id: reuniao3.id,
            conteudo: 'Ata da reunião de comissão realizada em ' + dataFormatada + '. Discussão sobre melhorias na infraestrutura.',
            criado_por_id: admin.id
        });
        
        // Criar decisões de exemplo
        this.createDecisao({
            reuniao_id: reuniao3.id,
            titulo: 'Aprovação de Orçamento',
            descricao: 'Aprovação do orçamento para melhorias na área comum',
            responsavel_id: admin.id,
            status: 'em_andamento'
        });
        
        this.createDecisao({
            reuniao_id: reuniao3.id,
            titulo: 'Contratação de Empresa',
            descricao: 'Contratação de empresa para manutenção dos elevadores',
            responsavel_id: user1.id,
            status: 'pendente'
        });
    }
}

