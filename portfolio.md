---
layout: portfolio
title: Mon Portfolio
permalink: /portfolio/
---

<section class="portfolio-hero">
    <h1 class="portfolio-title">Mon <strong>Portfolio</strong></h1>
    <p class="portfolio-subtitle">Découvrez mes compétences, projets et parcours</p>
</section>

<section id="portfolio-bubbles" class="portfolio-bubbles">
    <div class="bubble-container">
        <div class="portfolio-bubble bubble-competences" data-target="{{ '/pages/competences.html' | relative_url }}">
            <div class="bubble-content">
                <div class="bubble-icon">🚀</div>
                <h2>Mes <strong>compétences</strong></h2>
                <p>Langages, outils, et savoir-faire</p>
                <div class="bubble-tech">
                    <span class="tech-tag">Dev</span>
                    <span class="tech-tag">Design</span>
                    <span class="tech-tag">IA</span>
                </div>
            </div>
        </div>

        <div class="portfolio-bubble bubble-projets" data-target="{{ '/pages/projets.html' | relative_url }}">
            <div class="bubble-content">
                <div class="bubble-icon">💻</div>
                <h2>Mes <strong>projets</strong></h2>
                <p>Projets marquants et démonstrations</p>
                <div class="bubble-tech">
                    <span class="tech-tag">Web</span>
                    <span class="tech-tag">Mobile</span>
                    <span class="tech-tag">IA</span>
                </div>
            </div>
        </div>

        <div class="portfolio-bubble bubble-about" data-target="{{ '/pages/a-propos.html' | relative_url }}">
            <div class="bubble-content">
                <div class="bubble-icon">👤</div>
                <h2>À propos <strong>de moi</strong></h2>
                <p>Parcours, motivation, et contact</p>
                <div class="bubble-tech">
                    <span class="tech-tag">CV</span>
                    <span class="tech-tag">Contact</span>
                    <span class="tech-tag">Social</span>
                </div>
            </div>
        </div>
    </div>
</section>