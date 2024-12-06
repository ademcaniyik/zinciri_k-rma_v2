document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('habitModal');
    const addBtn = document.getElementById('addHabitBtn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const habitForm = document.getElementById('habitForm');
    const habitsContainer = document.getElementById('habits');
    const habitTemplate = document.getElementById('habit-template');

    // Modal işlemleri
    addBtn.onclick = function() {
        modal.style.display = "block";
        document.body.classList.add('modal-open');
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    }

    // Escape tuşu ile modal'ı kapatma
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    });

    // Takvim oluşturma fonksiyonu
    function createCalendar(calendarElement, habitId) {
        const year = new Date().getFullYear();
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        // Pazartesi gününe ayarla
        while (startDate.getDay() !== 1) {
            startDate.setDate(startDate.getDate() - 1);
        }

        // Takvim container'ını temizle
        calendarElement.innerHTML = '';

        // Her haftaya bir sütun oluştur
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const column = document.createElement('div');
            column.className = 'calendar-column';

            // Her sütunda 7 gün (1 haftada)
            for (let i = 0; i < 7; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'day';
                
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = `${currentDate.toLocaleDateString('tr-TR', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}`;
                
                dayElement.appendChild(tooltip);
                dayElement.dataset.date = currentDate.toISOString().split('T')[0];
                dayElement.dataset.habitId = habitId;
                
                dayElement.onclick = function() {
                    this.classList.toggle('active');
                    updateHabitLog(this.dataset.habitId, this.dataset.date);
                }
                
                column.appendChild(dayElement);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            calendarElement.appendChild(column);
        }
    }

    // Alışkanlık ekleme
    habitForm.onsubmit = function(e) {
        e.preventDefault();
        const habitName = document.getElementById('habitName').value;
        
        fetch('add_habit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'name=' + encodeURIComponent(habitName)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Template'i kopyala ve yeni alışkanlık için hazırla
                const template = document.getElementById('habit-template');
                const habitElement = document.importNode(template.content, true);
                
                // Alışkanlık adını ayarla
                const habitNameElement = habitElement.querySelector('.habit-name');
                habitNameElement.textContent = habitName;
                
                // Habit ID'sini ayarla
                const habitContainer = habitElement.querySelector('.habit-container');
                habitContainer.dataset.habitId = data.id;
                
                // Takvimi oluştur
                const calendarElement = habitElement.querySelector('.calendar');
                createCalendar(calendarElement, data.id);
                
                // Yeni alışkanlığı sayfaya ekle
                document.getElementById('habits').appendChild(habitElement);
                
                // Modal'ı kapat ve formu temizle
                modal.style.display = "none";
                document.body.classList.remove('modal-open');
                habitForm.reset();
            }
        });
    }

    // Alışkanlık güncellemesi
    function updateHabitLog(habitId, date) {
        fetch('update_log.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `habit_id=${habitId}&date=${date}`
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Başarılı güncelleme
            }
        });
    }

    // Alışkanlık silme fonksiyonu
    async function deleteHabit(habitId) {
        if (!confirm('Bu alışkanlığı silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const response = await fetch('delete_habit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `habit_id=${habitId}`
            });

            const data = await response.json();
            if (data.success) {
                const habitElement = document.querySelector(`[data-habit-id="${habitId}"]`);
                if (habitElement) {
                    habitElement.remove();
                }
            } else {
                alert('Alışkanlık silinirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Alışkanlık silinirken bir hata oluştu.');
        }
    }

    // Mevcut alışkanlıkları yükle
    async function loadHabits() {
        fetch('get_habits.php')
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                data.habits.forEach(habit => {
                    const habitElement = habitTemplate.content.cloneNode(true).querySelector('.habit-container');
                    habitElement.dataset.habitId = habit.id;
                    habitElement.querySelector('.habit-name').textContent = habit.name;
                    
                    // Delete button click handler'ını ekle
                    const deleteBtn = habitElement.querySelector('.delete-habit-btn');
                    deleteBtn.addEventListener('click', () => deleteHabit(habit.id));
                    
                    const calendarElement = habitElement.querySelector('.calendar');
                    createCalendar(calendarElement, habit.id);
                    
                    // Kayıtlı günleri işaretle
                    habit.logs.forEach(logDate => {
                        const dayElement = habitElement.querySelector(`[data-date="${logDate}"]`);
                        if (dayElement) {
                            dayElement.classList.add('active');
                        }
                    });
                    
                    habitsContainer.appendChild(habitElement);
                });
            }
        });
    }

    loadHabits();
});
