let quiz = {
  user: "Dave",
  questions: [
     {
        text: "O que você considera mais importante em um cartão de crédito?",
        responses: [
           { text: "Limite de Crédito Alto" },
           { text: "Sem anuidade"},
           { text: "Milhas aéreas" }
        ]
     },
     {
        text: "Em qual grupo você se encaixa?",
        responses: [
           { text: "Aposentado / Pensonista / Servidor Público"},
           { text: "Concurseiro / Estudante universitario" },
           { text: "Carteira assinada / Autonomo / Empreendedor" },
           { text: "Estou Desempregado" }
        ]
     },
     {
        text: "Atualmente você está negativado?",
        responses: [
           { text: "Sim" },
           { text: "Não" }
        ]
     }
  ]
},
userResponseSkelaton = Array(quiz.questions.length).fill(null);

new Vue({
el: "#app",
template: `
<!--container-->

<div>

  <section class="container">

    <div class="titleandparagraph">
      <h1>Descubra qual é o cartão de crédito ideal para você!</h1>
      <span>Responda às perguntas abaixo para que nossa tecnologia possa escolher o melhor cartão de crédito para
        você.</span>
    </div>


    <!--questionBox-->
    <div class="questionBox">

      <!-- transition -->
      <transition-group name="list" tag="p">


        <!--qusetionContainer-->
        <div class="questionContainer" v-if="questionIndex<quiz.questions.length" v-bind:key="questionIndex">

          <header>
            <h1 class="title is-6">UTUA</h1>
            <!--progress-->
            <div class="progressContainer">
              <progress class="progress is-info is-small" :value="parseInt((questionIndex/quiz.questions.length)*100)"
                max="100">{{parseInt((questionIndex/quiz.questions.length)*100)}}%</progress>
              <p>{{parseInt((questionIndex/quiz.questions.length)*100)}}% completo</p>
            </div>
            <!--/progress-->
          </header>

          <!-- questionTitle -->
          <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

          <!-- quizOptions -->
          <div class="optionContainer">
            <div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"
              @click="selectOption(index)" :class="{ 'is-selected': userResponses[questionIndex] == index}"
              :key="index">
              {{ index | charIndex }}. {{ response.text }}
            </div>
          </div>

          <!--quizFooter: navigation and progress-->
          <footer class="questionFooter">

            <!--pagination-->
            <nav class="pagination" role="navigation" aria-label="pagination">

              <!-- back button -->
              <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                Voltar
              </a>

              <!-- next button -->
              <a class="button" :class="(userResponses[questionIndex]==null)?'':'is-active'" v-on:click="next();"
                :disabled="questionIndex>=quiz.questions.length">
                {{ (userResponses[questionIndex]==null)?'Próxima':'Próxima' }}
              </a>

            </nav>
            <!--/pagination-->

          </footer>
          <!--/quizFooter-->

        </div>
        <!--/questionContainer-->

        <!--quizCompletedResult-->
        <div v-if="questionIndex >= quiz.questions.length" v-bind:key="questionIndex"
          class="quizCompleted has-text-centered">

          <img src="assets/img/JD-20-512.png" class="img-fluid"><br>
          <h1 class="MyFont">Falta pouco!</h1>
          <p class="lead">Digite seus dados abaixo e receba o cartão perfeito para você.</p>
          <div class="row justify-content-md-center">
            <div class="col-md-9">

              <div class="form-group">
                <input type="text" class="form-control" id="nome_send" aria-describedby="emailHelp"
                  placeholder="Insira seu nome.">
              </div>

              <div class="form-group">
                <input type="email" class="form-control" id="email_send" aria-describedby="emailHelp"
                  placeholder="Insira seu email.">
              </div>

              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="Check1_termos" checked style="display:none;">
              </div>
              <br>
            </div>

            <button onclick="send_info()" class="btn btn-primary btn-sm br">VER MEU CARTÃO DE CRÉDITO</button><br>
            <label style="max-width:70%;" id="label_check" class="form-check-label" for="exampleCheck1"><a
                href="https://utua.com.br/politica-de-privacidade/" target="_blank">
                Ao clicar no botão "ver meu cartao" você concorda com os termos de uso e as politicas de
                privacidade.</a></label>

          </div>
        </div>
        <!--/quizCompetedResult-->

      </transition-group>

    </div>
    <!--/questionBox-->

  </section>


</div>
  <!--/container-->
`,
data: {
  quiz: quiz,
  questionIndex: 0,
  userResponses: userResponseSkelaton,
  isActive: false
},
filters: {
  charIndex: function(i) {
     return String.fromCharCode(97 + i);
  }
},
methods: {
 restart: function(){
     this.questionIndex=0;
     this.userResponses=Array(this.quiz.questions.length).fill(null);
 },
  selectOption: function(index) {
     Vue.set(this.userResponses, this.questionIndex, index);
     //console.log(this.userResponses);
  },
  next: function() {
     if (this.questionIndex < this.quiz.questions.length)
        this.questionIndex++;
  },

  prev: function() {
     if (this.quiz.questions.length > 0) this.questionIndex--;
  },
  // Return "true" count in userResponses
  score: function() {
     var score = 0;
     for (let i = 0; i < this.userResponses.length; i++) {
        if (
           typeof this.quiz.questions[i].responses[
              this.userResponses[i]
           ] !== "undefined" &&
           this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
           score = score + 1;
        }
     }
     return score;

     //return this.userResponses.filter(function(val) { return val }).length;
  }
}
});


new Vue({
	el:"#header",
	template: `
	  <div class="navbar-links" style="
				width: 100%;
        position: absolute;
				top: 0; 
        
				">

		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Link Úteis</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Cartão de crédito <span class="sr-only">(Página atual)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Empréstimos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Financiamentos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Renda Extra</a>
          </li>
        </ul>
      </div>
    </nav>
	</div>	
	`
});

new Vue({
	el:"#footer",
	template: `
    <footer style="
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2.5rem;"
      class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
          <div class="col-md-1  text-center">
              <h3>UTUA</h3>
          </div>
          <div class="col-md-3  text-center">
            Utua · 2020 © Todos os direitos reservados
          </div>
            <div class="col-md-2  text-center"><a href="https://utua.com.br/politica-de-privacidade/"> Política de privacidade </a> </div>
            <div class="col-md-2  text-center"><a href="https://utua.com.br/termos-de-uso/"> Termos de Uso  </a></div>
            <div class="col-md-2  text-center"><a href="https://utua.com.br/quem-somos/"> Sobre nós </a></div>
            <div class="col-md-2  text-center"><a href="https://utua.com.br/contato/"> Contato </a></div>
        </div>
  </footer>`
});

