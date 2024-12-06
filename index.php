<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alışkanlık Takip</title>
    <link rel="stylesheet" href="style.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    <meta name="theme-color" content="#ffffff">

</head>
<body>
    <div class="container">
        <h1>Alışkanlık Takip</h1>
        <button id="addHabitBtn">Alışkanlık Ekle</button>
        
        <div id="habitModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Yeni Alışkanlık Ekle</h2>
                <form id="habitForm">
                    <input type="text" id="habitName" placeholder="Alışkanlık adı" required>
                    <button type="submit">Oluştur</button>
                </form>
            </div>
        </div>

        <div id="habits">
            <!-- Alışkanlıklar burada listelenecek -->
        </div>

        <template id="habit-template">
            <div class="habit-container">
                <div class="habit-header">
                    <h3 class="habit-name"></h3>
                    <button class="delete-habit-btn">Sil</button>
                </div>
                <div class="calendar-container">
                    <div class="months-container">
                        <div class="month-cell">Oca</div>
                        <div class="month-cell">Şub</div>
                        <div class="month-cell">Mar</div>
                        <div class="month-cell">Nis</div>
                        <div class="month-cell">May</div>
                        <div class="month-cell">Haz</div>
                        <div class="month-cell">Tem</div>
                        <div class="month-cell">Ağu</div>
                        <div class="month-cell">Eyl</div>
                        <div class="month-cell">Eki</div>
                        <div class="month-cell">Kas</div>
                        <div class="month-cell">Ara</div>
                    </div>
                    <div class="calendar-grid">
                        <div class="weekdays">
                            <div>Pzt</div>
                            <div>Sal</div>
                            <div>Çar</div>
                            <div>Per</div>
                            <div>Cum</div>
                            <div>Cmt</div>
                            <div>Paz</div>
                        </div>
                        <div class="calendar"></div>
                    </div>
                </div>
            </div>
        </template>

    </div>
    <script src="script.js"></script>
</body>
</html>
