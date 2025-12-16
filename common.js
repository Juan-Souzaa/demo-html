// Funções comuns para todas as páginas
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

function logout() {
    if (typeof Auth !== 'undefined') {
        Auth.logout();
    }
    window.location.href = 'login.html';
}

function showNotifications() {
    const notificacoes = getNotificacoes();
    let html = '';
    if (notificacoes.length > 0) {
        notificacoes.forEach(notif => {
            html += '<div class="alert alert-' + notif.tipo + ' alert-dismissible fade show" role="alert">' +
                '<strong>' + notif.titulo + '</strong>' +
                '<p class="mb-0 small">' + notif.mensagem + '</p>' +
                '</div>';
        });
    } else {
        html = '<p class="text-muted text-center py-4">Nenhuma notificação no momento.</p>';
    }
    
    Swal.fire({
        title: 'Notificações',
        html: html,
        width: '600px',
        showConfirmButton: true,
        confirmButtonText: 'Fechar'
    });
}

function getNotificacoes() {
    if (typeof DatabaseManager === 'undefined') return [];
    
    const obrigacoes = DatabaseManager.getObrigacoes();
    const reunioes = DatabaseManager.getReunioes();
    const hoje = new Date();
    const notificacoes = [];
    
    obrigacoes.forEach(obrigacao => {
        if (obrigacao.status !== 'concluida') {
            const diasRestantes = Utils.diffInDays(hoje, obrigacao.data_vencimento);
            if (diasRestantes <= 7 && diasRestantes >= -1) {
                const tipo = diasRestantes < 0 ? 'danger' : (diasRestantes <= 3 ? 'warning' : 'info');
                const mensagem = diasRestantes < 0 
                    ? 'Vencida há ' + Math.abs(diasRestantes) + ' dia(s)'
                    : 'Vence em ' + diasRestantes + ' dia(s)';
                notificacoes.push({
                    tipo: tipo,
                    titulo: 'Obrigação: ' + obrigacao.titulo,
                    mensagem: mensagem
                });
            }
        }
    });
    
    reunioes.forEach(reuniao => {
        if (['agendada', 'confirmada'].includes(reuniao.status)) {
            const dataReuniao = new Date(reuniao.data_hora);
            const hojeInicio = new Date(hoje);
            hojeInicio.setHours(0, 0, 0, 0);
            const amanhaFim = new Date(hoje);
            amanhaFim.setDate(amanhaFim.getDate() + 2);
            amanhaFim.setHours(23, 59, 59, 999);
            
            if (dataReuniao >= hojeInicio && dataReuniao <= amanhaFim) {
                const isHoje = dataReuniao.toDateString() === hoje.toDateString();
                notificacoes.push({
                    tipo: isHoje ? 'warning' : 'info',
                    titulo: (isHoje ? 'Reunião hoje' : 'Reunião amanhã') + ': ' + reuniao.titulo,
                    mensagem: Utils.formatDateTime(reuniao.data_hora) + (reuniao.local ? ' - ' + reuniao.local : '')
                });
            }
        }
    });
    
    return notificacoes;
}

// Função para obter ID da URL (para páginas show/edit)
function getUrlId() {
    // Tentar pegar da query string primeiro
    const params = new URLSearchParams(window.location.search);
    const idFromQuery = params.get('id');
    if (idFromQuery) return idFromQuery;
    
    // Tentar pegar do hash
    const hash = window.location.hash;
    if (hash && hash.startsWith('#id=')) {
        return hash.substring(4);
    }
    
    // Tentar pegar do pathname (formato /planejamento/show/123)
    const path = window.location.pathname;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart !== 'index.html' && !lastPart.includes('.html')) {
        return lastPart;
    }
    
    return null;
}

// Função para marcar menu ativo baseado na página atual
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
    
    // Páginas públicas não devem ter menu ativo
    const publicPages = ['login.html', 'register.html'];
    if (publicPages.includes(currentPage)) {
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        return;
    }
    
    const menuMap = {
        'dashboard.html': 'dashboard',
        'planejamento.html': 'planejamento',
        'planejamento-create.html': 'planejamento',
        'planejamento-show.html': 'planejamento',
        'obrigacoes.html': 'obrigacoes',
        'obrigacoes-create.html': 'obrigacoes',
        'obrigacoes-show.html': 'obrigacoes',
        'reunioes.html': 'reunioes',
        'reunioes-create.html': 'reunioes',
        'reunioes-show.html': 'reunioes',
        'relatorios.html': 'relatorios',
        'profile.html': 'profile',
        'permissions.html': 'permissions'
    };
    
    const activeItem = menuMap[currentPage];
    if (activeItem) {
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href') || '';
            // Normalizar o href (remover query strings e hashes)
            const linkPage = linkHref.split('?')[0].split('#')[0].split('/').pop();
            
            if (linkPage && linkPage.includes(activeItem + '.html')) {
                link.classList.add('active');
            } else if (activeItem === 'planejamento' && linkPage && linkPage.startsWith('planejamento')) {
                link.classList.add('active');
            } else if (activeItem === 'obrigacoes' && linkPage && linkPage.startsWith('obrigacoes')) {
                link.classList.add('active');
            } else if (activeItem === 'reunioes' && linkPage && linkPage.startsWith('reunioes')) {
                link.classList.add('active');
            }
        });
    }
}

// Inicialização comum
function initCommon() {
    // Verificar autenticação para páginas protegidas
    const publicPages = ['login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!publicPages.includes(currentPage)) {
        if (typeof Auth !== 'undefined' && !Auth.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
    } else {
        // Se estiver logado e tentar acessar login/register, redirecionar
        if (typeof Auth !== 'undefined' && Auth.isAuthenticated()) {
            window.location.href = 'dashboard.html';
            return false;
        }
    }
    
    // Atualizar nome do usuário
    const currentUser = Auth.getCurrentUser();
    if (currentUser) {
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.textContent = currentUser.name;
        }
        
        // Mostrar menu de permissões se tiver acesso
        const permissionsItem = document.getElementById('nav-permissions-item');
        if (permissionsItem) {
            if (currentUser.canManagePermissions) {
                permissionsItem.style.display = 'block';
            } else {
                permissionsItem.style.display = 'none';
            }
        } else {
            // Adicionar menu de permissões se não existir (fallback)
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav && currentUser.canManagePermissions) {
                const navItem = document.createElement('div');
                navItem.className = 'nav-item';
                navItem.id = 'nav-permissions-item';
                navItem.innerHTML = '<a href="permissions.html" class="nav-link"><i class="bi bi-shield-lock"></i> Permissões</a>';
                sidebarNav.appendChild(navItem);
            }
        }
    }
    
    // Marcar menu ativo (com pequeno delay para garantir que o DOM está pronto)
    setTimeout(() => {
        setActiveMenu();
    }, 100);
    
    // Atualizar contador de notificações
    const notificacoes = getNotificacoes();
    const countEl = document.getElementById('notification-count');
    if (countEl) {
        if (notificacoes.length > 0) {
            countEl.textContent = notificacoes.length > 99 ? '99+' : notificacoes.length;
            countEl.style.display = 'flex';
        } else {
            countEl.style.display = 'none';
        }
    }
    
    return true;
}

