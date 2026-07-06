/* ═══════════════════════════════════════════════════════════
   ODEUR DE DUBAÏ — Search Bar Component (JavaScript)
   Fichier autonome (IIFE) — aucune dépendance
   Injecte dynamiquement le composant dans le header existant
   Reorganise la structure selon la maquette mobile symétrique
   ═══════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    console.log('Odeur de Dubaï Search: Script chargé.');

    // ── INDEX DES PARFUMS ─────────────────────────────────────
    const PARFUMS = [
        {
            name: 'Vanilla Latte',
            inspiration: 'Bianco Latte',
            notes: ['Caramel', 'Réglisse', 'Beurre', 'Jasmin', 'Tonka', 'Miel', 'Vanille', 'Musc', 'Ambré'],
            url: 'vanilla-latte.html',
            image: 'assets/images/parfums/05-vanilla-latte.jpg'
        },
        {
            name: 'Kenzie WaterMelon On Ice',
            inspiration: 'Watermelon On Ice',
            notes: ['Pastèque', 'Bergamote', 'Pomme verte', 'Jasmin', 'Freesia', 'Bonbons', 'Melon', 'Musc blanc', 'Vanille', 'Bois de cachemire'],
            url: 'watermelon-on-ice.html',
            image: 'assets/images/parfums/01-watermelon-on-ice.jpg'
        },
        {
            name: 'Kenzie Irish Vanilla',
            inspiration: 'Vanilla Royale',
            notes: ['Rhum', 'Orchidée', 'Vanille', 'Jasmin', 'Vanille crémeuse', 'Crème brûlée', 'Épices', 'Fève tonka', 'Cuir', 'Rose', 'Patchouli', 'Cassonade', 'Bois de oud', 'Ambre', 'Musc'],
            url: 'irish-vanilla.html',
            image: 'assets/images/parfums/02-irish-vanilla.jpg'
        },
        {
            name: 'Kenzie Lemon Spark',
            inspiration: 'Capri In a Bottle Lemon Sugar 14',
            notes: ['Citron', 'Sucre', 'Vanille', 'Fleurs de citronnier', 'Freesia', 'Framboise', 'Praline', 'Benjoin'],
            url: 'lemon-spark.html',
            image: 'assets/images/parfums/03-lemon-spark.jpg'
        },
        {
            name: 'Esta Puro',
            inspiration: 'Erba Pura',
            notes: ['Orange sicilienne', 'Bergamote calabraise', 'Citron sicilien', 'Musc', 'Musc blanc', 'Vanille de Madagascar', 'Ambre'],
            url: 'esta-puro.html',
            image: 'assets/images/parfums/04-esta-fuera.jpg'
        },
        {
            name: 'Kenzie Exotic Apple Crush',
            inspiration: 'Eden Juicy Apple',
            notes: ['Pomme rouge', 'Litchi', 'Fruits rouges', 'Jasmin', 'Vanille', 'Musc'],
            url: 'exotic-apple-crush.html',
            image: 'assets/images/parfums/19-exotic-apple-crush.jpg'
        },
        {
            name: 'Barakkat Satin Oud',
            inspiration: 'Oud Satin Mood',
            notes: ['Safran', 'Élémi', 'Oud', 'Bois de cèdre', 'Patchouli'],
            url: 'barakkat-satin-oud.html',
            image: 'assets/images/parfums/07-barakkat-satin-oud.jpg'
        },
        {
            name: 'Kenzie Candid Vanilla',
            inspiration: 'Candy Rock Sugar',
            notes: ['Vanille', 'Agrumes', 'Vanille crémeuse', 'Fleur d\'oranger', 'Praliné', 'Bois de santal', 'Musc', 'Ambre'],
            url: 'candid-vanilla.html',
            image: 'assets/images/parfums/17-candid-vanilla.jpg'
        },
        {
            name: 'Kenzie Mystique Fleur',
            inspiration: 'Fleur Majesty Rose Royale',
            notes: ['Mandarine', 'Orange', 'Poire juteuse', 'Pêche', 'Magnolia', 'Pivoine', 'Rose', 'Bois violet', 'Vétiver'],
            url: 'mystique-fleur.html',
            image: 'assets/images/parfums/18-mystique-fieber.jpg'
        },
        {
            name: 'Kenzie Summer Bottled',
            inspiration: 'Maldives in a Bottle Ylang Coco 20',
            notes: ['Romarin', 'Citron', 'Ylang-ylang', 'Banane', 'Lait de coco'],
            url: 'summer-bottled.html',
            image: 'assets/images/parfums/14-summer-bottled.jpg'
        },
        {
            name: 'Kenzie Vanilla 70',
            inspiration: 'Vanilla 28',
            notes: ['Vanille', 'Poire', 'Pêche', 'Praliné', 'Fleur d\'oranger', 'Bois de santal', 'Musc', 'Ambre'],
            url: 'vanilla-70.html',
            image: 'assets/images/parfums/21-vanilla-70.jpg'
        },
        {
            name: 'Vanilla Powdery',
            inspiration: 'Vanilla Powder',
            notes: ['Poudre de noix de coco', 'Héliotrope', 'Vanille de Madagascar', 'Absolu de vanille', 'Musc blanc', 'Noix de coco', 'Lactones'],
            url: 'vanilla-powdery.html',
            image: 'assets/images/parfums/08-vanilla-powdery.jpg'
        }
    ];

    // ── Résolution du base path ─────────────────────────────
    function getBasePath() {
        var scripts = document.querySelectorAll('script[src*="search-bar.js"]');
        if (scripts.length > 0) {
            var src = scripts[scripts.length - 1].getAttribute('src');
            var idx = src.lastIndexOf('assets/search-bar.js');
            if (idx >= 0) return src.substring(0, idx);
        }
        return '';
    }

    var BASE = getBasePath();

    // ── Utilitaires ─────────────────────────────────────────

    function normalize(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function debounce(fn, ms) {
        var timer;
        return function () {
            var args = arguments;
            var ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
        };
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(text, terms) {
        if (!terms || terms.length === 0) return escapeHTML(text);
        var sorted = terms.slice().sort(function (a, b) { return b.length - a.length; });
        var normalizedText = normalize(text);
        var result = '';
        var lastIdx = 0;
        var match;

        var normalizedRegex = new RegExp('(' + sorted.map(function (t) { return escapeRegex(normalize(t)); }).join('|') + ')', 'gi');

        while ((match = normalizedRegex.exec(normalizedText)) !== null) {
            result += escapeHTML(text.substring(lastIdx, match.index));
            result += '<mark>' + escapeHTML(text.substring(match.index, match.index + match[0].length)) + '</mark>';
            lastIdx = match.index + match[0].length;
        }
        result += escapeHTML(text.substring(lastIdx));
        return result;
    }

    // ── Échappe le HTML ─────────────────────────────────────
    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ── Logique de recherche ────────────────────────────────

    function searchParfums(query) {
        var raw = query.trim();
        if (raw.length < 2) return [];

        var terms = normalize(raw).split(/\s+/).filter(function (t) { return t.length >= 2; });
        if (terms.length === 0) return [];

        var results = [];

        PARFUMS.forEach(function (p) {
            var nName = normalize(p.name);
            var nInspiration = normalize(p.inspiration);
            var nNotes = p.notes.map(normalize);

            var score = 0;
            var matchedTerms = 0;
            var matchedNotesList = [];

            terms.forEach(function (term) {
                var termMatched = false;

                if (nName.indexOf(term) !== -1) {
                    score += 3;
                    termMatched = true;
                }

                if (nInspiration.indexOf(term) !== -1) {
                    score += 2;
                    termMatched = true;
                }

                nNotes.forEach(function (nNote, idx) {
                    if (nNote.indexOf(term) !== -1) {
                        score += 1;
                        termMatched = true;
                        if (matchedNotesList.indexOf(p.notes[idx]) === -1) {
                            matchedNotesList.push(p.notes[idx]);
                        }
                    }
                });

                if (termMatched) matchedTerms++;
            });

            if (score > 0) {
                score += matchedTerms * 10;
                results.push({
                    parfum: p,
                    score: score,
                    matchedNotes: matchedNotesList,
                    allTermsMatched: matchedTerms === terms.length
                });
            }
        });

        results.sort(function (a, b) {
            if (a.allTermsMatched !== b.allTermsMatched) {
                return a.allTermsMatched ? -1 : 1;
            }
            return b.score - a.score;
        });

        return results;
    }

    // ── Construction du DOM ─────────────────────────────────

    var activeIndex = -1;
    var isMobileOpen = false;

    // SVG Icons avec styles en ligne explicites
    var SVG_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="#C5A880" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="width:22px; height:22px; display:block;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    var SVG_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(26, 14, 4, 0.4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="width:14px; height:14px; display:block;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    var SVG_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(26, 14, 4, 0.2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="width:16px; height:16px; display:block;"><polyline points="9 18 15 12 9 6"/></svg>';
    var SVG_NORESULT = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(197, 168, 128, 0.4)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="width:32px; height:32px; display:block; margin: 0 auto 8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="8" x2="14" y2="14"/></svg>';

    function createSearchField(id) {
        var fieldInner = document.createElement('div');
        fieldInner.className = 'ods-search-field-inner';

        var iconSpan = document.createElement('span');
        iconSpan.className = 'ods-search-input-icon';
        iconSpan.setAttribute('aria-hidden', 'true');
        iconSpan.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(26, 14, 4, 0.35)" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" style="width:16px; height:16px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        fieldInner.appendChild(iconSpan);

        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'ods-search-input';
        input.setAttribute('placeholder', 'Rechercher un parfum ou une note\u2026');
        input.setAttribute('role', 'searchbox');
        input.setAttribute('aria-autocomplete', 'list');
        input.setAttribute('aria-controls', id + '-listbox');
        input.setAttribute('aria-activedescendant', '');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');
        input.id = id + '-input';
        fieldInner.appendChild(input);

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'ods-search-close';
        closeBtn.setAttribute('aria-label', 'Effacer la recherche');
        closeBtn.setAttribute('tabindex', '-1');
        closeBtn.innerHTML = SVG_CLOSE;
        fieldInner.appendChild(closeBtn);

        var listbox = document.createElement('ul');
        listbox.id = id + '-listbox';
        listbox.className = 'ods-suggestions';
        listbox.setAttribute('role', 'listbox');
        listbox.setAttribute('aria-label', 'Suggestions de parfums');
        fieldInner.appendChild(listbox);

        var combobox = document.createElement('div');
        combobox.setAttribute('role', 'combobox');
        combobox.setAttribute('aria-expanded', 'false');
        combobox.setAttribute('aria-haspopup', 'listbox');
        combobox.setAttribute('aria-owns', id + '-listbox');
        combobox.appendChild(fieldInner);

        return {
            container: combobox,
            input: input,
            listbox: listbox,
            close: closeBtn
        };
    }

    // ── Rendu des suggestions ───────────────────────────────

    function renderSuggestions(listbox, results, terms) {
        listbox.innerHTML = '';
        var combobox = listbox.closest('[role="combobox"]');

        if (results.length === 0) {
            combobox && combobox.setAttribute('aria-expanded', 'true');
            listbox.innerHTML =
                '<li class="ods-no-results" role="option" aria-selected="false">' +
                SVG_NORESULT +
                'Aucun parfum ne correspond à votre recherche' +
                '</li>';
            listbox.classList.add('ods-visible');
            return;
        }

        results.forEach(function (r, i) {
            var li = document.createElement('li');
            li.className = 'ods-suggestion-item';
            li.id = listbox.id.replace('-listbox', '') + '-option-' + i;
            li.setAttribute('role', 'option');
            li.setAttribute('aria-selected', 'false');
            li.setAttribute('data-url', BASE + r.parfum.url);

            var notesText = r.matchedNotes.length > 0
                ? r.matchedNotes.join(', ')
                : r.parfum.notes.slice(0, 4).join(', ');

            li.innerHTML =
                '<img class="ods-suggestion-thumb" src="' + BASE + r.parfum.image + '" alt="" loading="lazy" />' +
                '<div class="ods-suggestion-info">' +
                    '<span class="ods-suggestion-name">' + highlightText(r.parfum.name, terms) + '</span>' +
                    '<span class="ods-suggestion-notes">' + highlightText(notesText, terms) + '</span>' +
                '</div>' +
                SVG_ARROW;

            listbox.appendChild(li);
        });

        combobox && combobox.setAttribute('aria-expanded', 'true');
        listbox.classList.add('ods-visible');
        activeIndex = -1;
    }

    function hideSuggestions(listbox) {
        listbox.classList.remove('ods-visible');
        listbox.innerHTML = '';
        var combobox = listbox.closest('[role="combobox"]');
        combobox && combobox.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
    }

    function setActiveOption(listbox, input, index) {
        var items = listbox.querySelectorAll('.ods-suggestion-item');
        items.forEach(function (item) { item.setAttribute('aria-selected', 'false'); });

        if (index >= 0 && index < items.length) {
            items[index].setAttribute('aria-selected', 'true');
            items[index].scrollIntoView({ block: 'nearest' });
            input.setAttribute('aria-activedescendant', items[index].id);
            activeIndex = index;
        } else {
            input.setAttribute('aria-activedescendant', '');
            activeIndex = -1;
        }
    }

    // ── Bind événements sur un couple input/listbox ─────────

    function bindSearchEvents(input, listbox, closeFn) {
        var currentTerms = [];

        var doSearch = debounce(function () {
            var val = input.value;
            if (val.trim().length < 2) {
                hideSuggestions(listbox);
                currentTerms = [];
                return;
            }
            var terms = normalize(val).split(/\s+/).filter(function (t) { return t.length >= 2; });
            currentTerms = terms;
            var results = searchParfums(val);
            renderSuggestions(listbox, results, terms);
        }, 200);

        input.addEventListener('input', doSearch);

        input.addEventListener('keydown', function (e) {
            var items = listbox.querySelectorAll('.ods-suggestion-item');
            var count = items.length;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (count === 0) return;
                    setActiveOption(listbox, input, activeIndex < count - 1 ? activeIndex + 1 : 0);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    if (count === 0) return;
                    setActiveOption(listbox, input, activeIndex > 0 ? activeIndex - 1 : count - 1);
                    break;

                case 'Enter':
                    e.preventDefault();
                    if (activeIndex >= 0 && activeIndex < count) {
                        var url = items[activeIndex].getAttribute('data-url');
                        if (url) window.location.href = url;
                    }
                    break;

                case 'Escape':
                    e.preventDefault();
                    hideSuggestions(listbox);
                    if (closeFn) closeFn();
                    break;
            }
        });

        listbox.addEventListener('click', function (e) {
            var item = e.target.closest('.ods-suggestion-item');
            if (item) {
                var url = item.getAttribute('data-url');
                if (url) window.location.href = url;
            }
        });

        listbox.addEventListener('mousedown', function (e) {
            e.preventDefault();
        });
    }

    // ── Injection dans le header ────────────────────────────

    function init() {
        console.log('Odeur de Dubaï Search: Initialisation en cours...');
        try {
            var header = document.getElementById('main-header');
            if (!header) {
                console.warn('Odeur de Dubaï Search: Element #main-header introuvable.');
                return;
            }

            var nav = header.querySelector('nav');
            if (!nav) {
                console.warn('Odeur de Dubaï Search: Element nav introuvable dans le header.');
                return;
            }

            var children = nav.children;
            var logoBlock = children[0];
            var actionsBlock = children[children.length - 1];

            if (!logoBlock || !actionsBlock) {
                console.warn('Odeur de Dubaï Search: Éléments de base du header introuvables.');
                return;
            }

            // Assigner les classes de structure pour le repositionnement CSS Flexbox
            logoBlock.classList.add('ods-header-logo');
            actionsBlock.classList.add('ods-header-actions');

            // Rechercher et classer le bloc central d'onglets (s'il existe)
            var collectionsBtn = document.getElementById('header-nav-collections');
            if (collectionsBtn) {
                var navLinksBlock = collectionsBtn.parentNode;
                if (navLinksBlock) {
                    navLinksBlock.classList.add('ods-header-links');
                }
            } else {
                header.classList.add('ods-subpage-header');
            }

            // ── 1. Desktop : champ de recherche visible ──
            var desktopField = createSearchField('ods-desktop');
            var desktopContainer = document.createElement('div');
            desktopContainer.className = 'ods-search-field-desktop ods-search-wrapper';
            desktopContainer.appendChild(desktopField.container);
            
            // On l'insère au début du nav (order: 1 sur desktop le mettra à gauche)
            nav.insertBefore(desktopContainer, nav.firstChild);

            // ── 2. Mobile : actions de gauche (Menu Burger + Loupe) ──
            var leftActions = document.createElement('div');
            leftActions.className = 'ods-mobile-left-actions';

            // Bouton loupe mobile
            var trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.className = 'ods-search-trigger';
            trigger.setAttribute('aria-label', 'Rechercher un parfum');
            trigger.innerHTML = SVG_SEARCH;

            // Déplacer le Burger button (s'il existe) de l'actionsBlock vers la gauche
            var burger = document.getElementById('menu-burger');
            if (burger) {
                leftActions.appendChild(burger);
            }
            
            // Ajouter la loupe après le burger
            leftActions.appendChild(trigger);

            // Insérer leftActions au début du nav (avant le desktopContainer)
            nav.insertBefore(leftActions, nav.firstChild);

            // ── 3. Mobile : panneau pleine largeur ──
            var mobilePanel = document.createElement('div');
            mobilePanel.className = 'ods-search-mobile-panel';
            mobilePanel.id = 'ods-mobile-panel';
            var mobileField = createSearchField('ods-mobile');
            mobilePanel.appendChild(mobileField.container);

            // Backdrop mobile
            var backdrop = document.createElement('div');
            backdrop.className = 'ods-search-backdrop';

            // Insérer après le header
            header.parentNode.insertBefore(mobilePanel, header.nextSibling);
            header.parentNode.insertBefore(backdrop, mobilePanel.nextSibling);

            function updateMobilePanelTop() {
                var headerRect = header.getBoundingClientRect();
                mobilePanel.style.top = headerRect.bottom + 'px';
            }

            function clearDesktop() {
                desktopField.input.value = '';
                hideSuggestions(desktopField.listbox);
                desktopField.input.focus();
            }

            function openMobile() {
                isMobileOpen = true;
                updateMobilePanelTop();
                mobilePanel.classList.add('ods-active');
                backdrop.classList.add('ods-active');
                document.body.style.overflow = 'hidden';
                setTimeout(function () {
                    mobileField.input.focus();
                }, 150);
            }

            function closeMobile() {
                isMobileOpen = false;
                mobilePanel.classList.remove('ods-active');
                backdrop.classList.remove('ods-active');
                document.body.style.overflow = '';
                hideSuggestions(mobileField.listbox);
                mobileField.input.value = '';
                trigger.focus();
            }

            // Événements du trigger mobile
            trigger.addEventListener('click', function () {
                var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
                if (!isDesktop) {
                    if (isMobileOpen) {
                        closeMobile();
                    } else {
                        openMobile();
                    }
                }
            });

            // Bind search events
            bindSearchEvents(desktopField.input, desktopField.listbox, function () {
                hideSuggestions(desktopField.listbox);
            });
            bindSearchEvents(mobileField.input, mobileField.listbox, closeMobile);

            // Action du bouton clear / close
            desktopField.close.addEventListener('click', clearDesktop);
            mobileField.close.addEventListener('click', closeMobile);

            // Backdrop click mobile
            backdrop.addEventListener('click', closeMobile);

            // Clic extérieur (desktop) - Fermer les suggestions
            document.addEventListener('click', function (e) {
                var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
                if (isDesktop && !desktopContainer.contains(e.target)) {
                    hideSuggestions(desktopField.listbox);
                }
            });

            // Resize handler
            var resizeDebounce = debounce(function () {
                var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
                if (isDesktop && isMobileOpen) closeMobile();
            }, 150);

            window.addEventListener('resize', resizeDebounce);

            // Scroll handler mobile
            window.addEventListener('scroll', function () {
                if (isMobileOpen) updateMobilePanelTop();
            }, { passive: true });

            console.log('Odeur de Dubaï Search: Initialisation terminée avec succès.');

        } catch (error) {
            console.error('Odeur de Dubaï Search: Erreur durant l\'initialisation :', error);
        }
    }

    // ── Lancer à la fin du chargement ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
