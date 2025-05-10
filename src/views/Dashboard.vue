<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });
});
</script>

<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="welcome-section" data-aos="fade-up">
            <h1 class="welcome-title floating">مرحباً بكم في لوحة التحكم</h1>
            
            <div class="medical-icons" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-stethoscope medical-icon pulse"></i>
              <i class="fas fa-user-md medical-icon"></i>
              <i class="fas fa-heartbeat medical-icon pulse"></i>
              <i class="fas fa-graduation-cap medical-icon"></i>
              <i class="fas fa-book-medical medical-icon"></i>
            </div>

            <div class="arabic-text" data-aos="fade-up" data-aos-delay="300">
              بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ.
              <br>
              اللَّهُمَّ اجْعَلْ عَمَلِي هَذَا خَالِصًا لِوَجْهِكَ، وَانْفَعْ بِهِ طُلَّابِي، وَافْتَحْ عَلَيَّ فُتُوحَ الْعَارِفِينَ، وَيَسِّرْ لِي مَا أَصْعَبَ، وَقَنِّعْنِي بِمَا رَزَقْتَنِي.
              <br>
              اللَّهُمَّ عَلِّمْنِي مَا يَنْفَعُنِي، وَانْفَعْنِي بِمَا عَلَّمْتَنِي، وَارْزُقْنِي فَهْمًا وَحِكْمَةً، وَأَلْهِمْنِي رَشَدِي
            </div>

            <div data-aos="fade-up" data-aos-delay="400">
              <div class="video-container">
                <iframe   loading="lazy"
                  src="https://www.youtube.com/embed/3JPbc8iZjrs?si=QK_AyjEXcMZd8iiI"
                  title="Introduction Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');


body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%);
  font-family: 'Inter', sans-serif;
}

.dashboard-container {
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
}

.dashboard-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  z-index: -1;
}

.welcome-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.welcome-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.medical-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  color: var(--primary-color);
}

.medical-icon {
  font-size: 2.5rem;
  transition: all 0.3s ease;
}

.medical-icon:hover {
  transform: scale(1.1);
  color: #34a853;
}

.arabic-text {
  font-family: 'Amiri', serif;
  font-size: 1.8rem;
  line-height: 2.8;
  text-align: center;
  direction: rtl;
  color: var(--primary-color);
  padding: 2.5rem;
  position: relative;
  background: linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7));
  border-radius: 16px;
  margin: 1rem;
}

.arabic-text::before,
.arabic-text::after {
  content: '❖';
  position: absolute;
  color: #34a853;
  font-size: 1.5rem;
}

.arabic-text::before {
  top: 1rem;
  right: 1rem;
}

.arabic-text::after {
  bottom: 1rem;
  left: 1rem;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  margin: 2rem;
  margin-bottom: 130px;
  margin-top: -80px;
  border: 3px solid rgba(26, 115, 232, 0.1);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.welcome-title {
  color: var(--primary-color);
  font-size: 2.8rem;
  margin: 2rem 0;
  position: relative;
  text-align: center;
  padding: 1rem 0;
  font-weight: 700;
}

.welcome-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(to right, var(--primary-color), #34a853);
  border-radius: 4px;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
div[data-aos="fade-up"] {
  z-index: 10; 
  opacity: 1 !important; 
}
</style>