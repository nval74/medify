document.addEventListener('DOMContentLoaded', () => {
    // ===== KONFIGURASI & VARIABEL GLOBAL =====
    const STORAGE_KEY = 'medifyData';
    const VIEW_MODE_KEY = 'medifyViewMode';
    const ACTIVE_PAGE_KEY = 'medifyActivePage';

    // ===== SELEKTOR DOM =====
    const addMedicineBtn = document.getElementById('add-medicine-btn');
    const medicineModal = document.getElementById('medicine-modal');
    const modalBackdrop = medicineModal.querySelector('.modal-backdrop');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const medicineForm = document.getElementById('medicine-form');
    const medicineListContainer = document.getElementById('medicine-list');
    const noMedicineMsg = document.getElementById('no-medicine-msg');
    const medicineCardTemplate = document.getElementById('medicine-card-template');
    const searchInput = document.getElementById('search-input');
    const listViewBtn = document.getElementById('list-view-btn');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const navDashboardBtn = document.getElementById('nav-dashboard');
    const navInfoBtn = document.getElementById('nav-info');
    const dashboardView = document.getElementById('dashboard-view');
    const infoView = document.getElementById('info-view');
    const articleFilterBtns = document.querySelectorAll('.article-filter-btn');
    const articleList = document.getElementById('article-list');


    let currentViewMode = localStorage.getItem(VIEW_MODE_KEY) || 'list';
    let currentPage = localStorage.getItem(ACTIVE_PAGE_KEY) || 'dashboard';

    // ===== FUNGSI UNTUK LOCALSTORAGE =====
    const getMedicinesFromStorage = () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    };

    const saveMedicinesToStorage = (medicines) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    };
    
    // ===== INISIALISASI DATA CONTOH =====
    const initializeSampleData = () => {
        const medicines = getMedicinesFromStorage();
        if (medicines.length === 0) {
             const today = new Date();
            const sampleMedicines = [
                {
                    id: Date.now() + 1,
                    name: 'Paracetamol 500mg',
                    expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
                    stock: 20,
                    imageUrl: 'https://i.ibb.co/hKw2h0k/paracetamol-box.png'
                },
                {
                    id: Date.now() + 2,
                    name: 'Vitamin C 1000mg',
                    expiry: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
                    stock: 45,
                    imageUrl: 'https://i.ibb.co/bJC2wT3/vitamin-c-bottle.png'
                },
                {
                    id: Date.now() + 3,
                    name: 'Obat Batuk Sirup',
                    expiry: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
                    stock: 3,
                    imageUrl: 'https://i.ibb.co/D852L0S/cough-syrup-box.png'
                }
            ];
            saveMedicinesToStorage(sampleMedicines);
        }
    };

    // ===== LOGIKA UTAMA APLIKASI =====
    const navigateTo = (page) => {
        currentPage = page;
        localStorage.setItem(ACTIVE_PAGE_KEY, page);

        dashboardView.classList.add('hidden');
        infoView.classList.add('hidden');

        if (page === 'dashboard') {
            dashboardView.classList.remove('hidden');
            navDashboardBtn.classList.add('nav-link-active');
            navInfoBtn.classList.remove('nav-link-active');
        } else if (page === 'info') {
            infoView.classList.remove('hidden');
            navInfoBtn.classList.add('nav-link-active');
            navDashboardBtn.classList.remove('nav-link-active');
        }
    };
    
    const openModal = () => {
        medicineModal.classList.remove('hidden');
        setTimeout(() => {
            medicineModal.querySelector('.modal').classList.remove('scale-95');
        }, 10);
    };

    const closeModal = () => {
        medicineModal.querySelector('.modal').classList.add('scale-95');
        setTimeout(() => {
            medicineModal.classList.add('hidden');
        }, 300);
    };

     const showConfirmation = (title, message) => {
        return new Promise((resolve) => {
            const dialog = document.getElementById('confirm-dialog');
            document.getElementById('confirm-title').textContent = title;
            document.getElementById('confirm-message').textContent = message;
            dialog.classList.remove('hidden');

            const okBtn = document.getElementById('confirm-ok');
            const cancelBtn = document.getElementById('confirm-cancel');

            const close = (result) => {
                dialog.classList.add('hidden');
                okBtn.replaceWith(okBtn.cloneNode(true));
                cancelBtn.replaceWith(cancelBtn.cloneNode(true));
                resolve(result);
            };

            okBtn.addEventListener('click', () => close(true));
            cancelBtn.addEventListener('click', () => close(false));
        });
    };

    const updateWarnings = () => {
        const medicines = getMedicinesFromStorage();
        
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

        const parseDateAsUTC = (dateString) => {
            if (!dateString) return null;
            const parts = dateString.split('-').map(part => parseInt(part, 10));
            return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
        };

        const daysUntil = (dateString) => {
            const expiryDateUTC = parseDateAsUTC(dateString);
            if (!expiryDateUTC) return Infinity;
            const diffTime = expiryDateUTC - today;
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };
        
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setUTCDate(today.getUTCDate() + 30);

        const expired = medicines.filter(med => parseDateAsUTC(med.expiry) < today);
        const expiringSoon = medicines.filter(med => {
            const expiryDateUTC = parseDateAsUTC(med.expiry);
            return expiryDateUTC >= today && expiryDateUTC <= thirtyDaysFromNow;
        });
        const lowStock = medicines.filter(med => med.stock <= 5);

        const renderSimpleWarningList = (containerId, items, defaultMsg) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            if (items.length === 0) {
                const p = document.createElement('p');
                if (containerId === 'expired-list') p.className = 'text-red-600 text-sm';
                if (containerId === 'low-stock-list') p.className = 'text-yellow-600 text-sm';
                p.textContent = defaultMsg;
                container.appendChild(p);
            } else {
                items.forEach(item => {
                    const p = document.createElement('p');
                    p.className = 'text-sm font-semibold';
                    p.textContent = item.name;
                    container.appendChild(p);
                });
            }
        };

        const expiringSoonContainer = document.getElementById('expiring-soon-list');
        expiringSoonContainer.innerHTML = '';
        if (expiringSoon.length === 0) {
            const p = document.createElement('p');
            p.className = 'text-orange-600 text-sm';
            p.textContent = 'Tidak ada obat yang akan kedaluwarsa.';
            expiringSoonContainer.appendChild(p);
        } else {
            expiringSoon.forEach(item => {
                const daysLeft = daysUntil(item.expiry);
                let expiryText = '';

                if (daysLeft === 0) {
                    expiryText = `kedaluwarsa <span class="font-bold">hari ini</span>.`;
                } else if (daysLeft === 1) {
                    expiryText = `akan kedaluwarsa <span class="font-bold">besok</span>.`;
                } else {
                    expiryText = `akan kedaluwarsa dalam <span class="font-bold">${daysLeft} hari</span> lagi.`;
                }

                const p = document.createElement('p');
                p.className = 'text-sm';
                p.innerHTML = `<span class="font-semibold">${item.name}</span> ${expiryText}`;
                expiringSoonContainer.appendChild(p);
            });
        }
        
        renderSimpleWarningList('expired-list', expired, 'Tidak ada obat yang kedaluwarsa.');
        renderSimpleWarningList('low-stock-list', lowStock, 'Stok semua obat aman.');
    };

    const setViewMode = (mode) => {
        currentViewMode = mode;
        localStorage.setItem(VIEW_MODE_KEY, mode);

        listViewBtn.classList.toggle('view-btn-active', mode === 'list');
        gridViewBtn.classList.toggle('view-btn-active', mode === 'grid');
        
        renderApp(searchInput.value);
    };
    
    const handleArticleFilter = (filter) => {
        articleFilterBtns.forEach(btn => {
            btn.classList.toggle('article-filter-btn-active', btn.dataset.filter === filter);
             btn.classList.toggle('bg-white', btn.dataset.filter !== filter);
        });

        const articles = articleList.querySelectorAll('.article-card');
        articles.forEach(article => {
            const category = article.dataset.category;
            if (filter === 'semua' || filter === 'terpopuler' || filter === 'terbaru' || filter === category) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    };

    const renderApp = (filter = '') => {
        const medicines = getMedicinesFromStorage();
        
        document.querySelectorAll('.medicine-card-instance').forEach(card => card.remove());

        if (currentViewMode === 'list') {
            medicineListContainer.className = 'grid grid-cols-1 lg:grid-cols-2 gap-4';
        } else {
            medicineListContainer.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
        }

        const filteredMedicines = medicines.filter(med => 
            med.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredMedicines.length === 0) {
            noMedicineMsg.classList.remove('hidden');
        } else {
            noMedicineMsg.classList.add('hidden');
            filteredMedicines.forEach(med => {
                const card = medicineCardTemplate.cloneNode(true);
                card.classList.remove('hidden');
                card.classList.add('medicine-card-instance');
                card.id = `med-${med.id}`;
                
                if (currentViewMode === 'list') {
                    card.className = 'medicine-card-instance bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex items-center p-4 gap-4';
                    card.querySelector('.medicine-img').className = 'medicine-img w-20 h-20 object-cover rounded-md flex-shrink-0';
                    card.querySelector('.medicine-details').className = 'flex-grow';
                    card.querySelector('.medicine-actions').className = 'flex flex-col gap-2 self-start';
                } else {
                    card.className = 'medicine-card-instance bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col p-4 gap-2 text-center items-center';
                    card.querySelector('.medicine-img').className = 'medicine-img w-full h-24 object-cover rounded-md mb-2';
                    card.querySelector('.medicine-details').className = 'flex-grow';
                    card.querySelector('.medicine-actions').className = 'flex gap-2 mt-2';
                }
                
                card.querySelector('.medicine-img').src = med.imageUrl || 'https://placehold.co/100x100/E0F2FE/3B82F6?text=Obat';
                card.querySelector('.medicine-img').alt = med.name;
                card.querySelector('.medicine-name').textContent = med.name;
                card.querySelector('.medicine-expiry').textContent = new Date(med.expiry).toLocaleDateString('id-ID', { timeZone: 'UTC', day: '2-digit', month: 'long', year: 'numeric' });
                card.querySelector('.medicine-stock').textContent = med.stock;
                
                card.querySelector('.edit-btn').addEventListener('click', () => handleEditClick(med.id));
                card.querySelector('.delete-btn').addEventListener('click', () => handleDeleteClick(med.id));
                
                medicineListContainer.insertBefore(card, noMedicineMsg);
            });
        }
        updateWarnings();
    };

    const handleEditClick = (id) => {
        const medicines = getMedicinesFromStorage();
        const medicineToEdit = medicines.find(med => med.id === id);

        if (medicineToEdit) {
            document.getElementById('medicine-id').value = medicineToEdit.id;
            document.getElementById('medicine-name').value = medicineToEdit.name;
            document.getElementById('medicine-expiry').value = medicineToEdit.expiry;
            document.getElementById('medicine-stock').value = medicineToEdit.stock;
            document.getElementById('medicine-image-url').value = medicineToEdit.imageUrl || '';
            document.getElementById('modal-title').textContent = 'Edit Obat';
            openModal();
        }
    };

    const handleDeleteClick = async (id) => {
        const confirmed = await showConfirmation(
            'Konfirmasi Hapus',
            'Apakah Anda yakin ingin menghapus obat ini?'
        );
        if (confirmed) {
            let medicines = getMedicinesFromStorage();
            medicines = medicines.filter(med => med.id !== id);
            saveMedicinesToStorage(medicines);
            renderApp(searchInput.value);
        }
    };
    
    // ===== EVENT LISTENERS =====
    addMedicineBtn.addEventListener('click', () => {
        medicineForm.reset();
        document.getElementById('medicine-id').value = '';
        document.getElementById('modal-title').textContent = 'Tambah Obat Baru';
        openModal();
    });

    modalBackdrop.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    
    listViewBtn.addEventListener('click', () => setViewMode('list'));
    gridViewBtn.addEventListener('click', () => setViewMode('grid'));

    navDashboardBtn.addEventListener('click', () => navigateTo('dashboard'));
    navInfoBtn.addEventListener('click', () => navigateTo('info'));

    articleFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => handleArticleFilter(btn.dataset.filter));
    });

    medicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('medicine-id').value;
        let medicines = getMedicinesFromStorage();
        
        const medicineData = {
            name: document.getElementById('medicine-name').value,
            expiry: document.getElementById('medicine-expiry').value,
            stock: parseInt(document.getElementById('medicine-stock').value, 10),
            imageUrl: document.getElementById('medicine-image-url').value
        };

        if (id) {
            const numericId = parseInt(id, 10);
            const index = medicines.findIndex(med => med.id === numericId);
            if (index !== -1) {
                medicines[index] = { id: numericId, ...medicineData };
            }
        } else {
            medicineData.id = Date.now();
            medicines.push(medicineData);
        }

        saveMedicinesToStorage(medicines);
        closeModal();
        renderApp(searchInput.value);
    });

    searchInput.addEventListener('input', (e) => {
        renderApp(e.target.value);
    });

    // ===== INISIALISASI APLIKASI =====
    initializeSampleData();
    setViewMode(currentViewMode); 
    navigateTo(currentPage);
});