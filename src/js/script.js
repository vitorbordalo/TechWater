// HAMBURGER MENU
const btnHamburger = document.getElementById('hamburger');
const navMenu      = document.getElementById('header-menu');

btnHamburger.addEventListener('click', () => {
  // anima o ícone
  btnHamburger.classList.toggle('active');
  // revela/esconde o menu
  navMenu.classList.toggle('active');
});

// FECHAR MENU APÓS CLIQUE EM ITEM (MOBILE)
document.querySelectorAll('.header-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      btnHamburger.classList.remove('active');
    }
  });
});

// THEME SWITCHER
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.setAttribute('data-theme', btn.dataset.theme);
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// SLIDESHOW
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = idx => {
  slides.forEach(s => s.classList.remove('active'));
  slides[idx].classList.add('active');
};
document.querySelector('.prev').addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});
document.querySelector('.next').addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});
setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}, 5000);

// FORM VALIDATION
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }
  alert('Mensagem enviada com sucesso!');
  form.reset();
});

// QUIZ COM FEEDBACK DETALHADO
const questions = [
  { q: 'Qual é o principal fator que causa enchentes urbanas?', a: ['Deficiências na drenagem','Excesso de chuva','Erosão do solo'], correct: 0 },
  { q: 'Como sensores IoT ajudam no monitoramento?', a: ['Detectam nível de água em tempo real','Enviam relatórios semanais','Controlam vazão'], correct: 0 },
  { q: 'A partir de que nível (m) há risco de transbordamento?', a: ['1m','2m','5m'], correct: 1 },
  { q: 'Qual ação quando nível atinge 2,5m?', a: ['Emitir alerta e abrir abrigos','Apenas monitorar','Encerrar serviços'], correct: 0 },
  { q: 'Antecedência mínima de alerta?', a: ['10 min','30 min','1 hora'], correct: 1 },
  { q: 'Como push notifications ajudam?', a: ['Enviam alertas imediatos','Criam relatórios mensais','Bloqueiam apps'], correct: 0 },
  { q: 'Rota alternativa em alagamentos?', a: ['Rua paralela elevada','Vias centrais','Ruas residenciais'], correct: 0 },
  { q: 'Medida em casa para prevenção?', a: ['Elevar móveis','Plantar árvores','Pintar paredes'], correct: 0 },
  { q: 'O que exibe o dashboard?', a: ['Mapa de áreas inundadas','Faturas automáticas','Controle de semáforos'], correct: 0 },
  { q: 'Órgão que coordena resgates?', a: ['Defesa Civil','MEC','Detran'], correct: 0 }
];

const quizContainer = document.getElementById('quiz-container');
const resultDiv     = document.getElementById('quiz-result');

// Renderizar quiz
questions.forEach((item,i) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `
    <p>${i+1}. ${item.q}</p>
    <div class="answers">
      ${item.a.map((opt,j)=>`
        <label><input type="radio" name="q${i}" value="${j}"> ${opt}</label>
      `).join('')}
    </div>
  `;
  quizContainer.appendChild(div);
});

// Submeter quiz
document.getElementById('quiz-submit').addEventListener('click', () => {
  let score = 0, details = [];
  questions.forEach((item,i) => {
    const sel = quizContainer.querySelector(`input[name=q${i}]:checked`);
    if(sel && +sel.value===item.correct){
      score++; details.push(`Pergunta ${i+1}: correta`);
    } else {
      details.push(`Pergunta ${i+1}: incorreta (Resposta: ${item.a[item.correct]})`);
    }
  });
  resultDiv.innerHTML = `
    <p>Você acertou ${score} de ${questions.length} perguntas.</p>
    <ul>${details.map(d=>`<li>${d}</li>`).join('')}</ul>
  `;
});