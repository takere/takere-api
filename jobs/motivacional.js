const Board = require('../models/Board')
const Flow = require('../models/Flow')
const Executed = require('../models/Executed')

const handler = async (data, jobId, flowId) => {
    const flow = await Flow.findById(flowId);
    const executed = await Executed.create(
        pickMotivational(data.results),
        jobId
    );

    //name, description, userEmail, flow, node
    const board = await Board.createBoard(
        data.results.boardName,
        data.results.boardDescription,
        flow.userEmail,
        flow._id,
        jobId,
        executed
    );
}

module.exports = {
    handler
}

const pickMotivational = (results) => {
    let phrase = '';

    const phrasesSmoker = [
        'Tão naturalmente quanto respiro, reorganizo meus recursos para me tornar mais saudável.',
        'Quais comportamentos novos podem ser interessantes para fluir de forma mais saudável nos ambientes em que eu fumava?',
        'Por que é importante construir esse resultado, e quais recursos e capacidades podem me levar a novos comportamentos nesses ambientes?',
        'Quem eu me torno mudando rapidamente? Como isso impacta positivamente o meu projeto de vida e tudo mais à minha volta?',
        'Esse resultado é possível de ser alcançado, eu tenho todos os recursos para isso e, mais que qualquer coisa, eu mereço o que existe de melhor para a minha vida!',
        'Fumar mata cerca de 6 milhões de pessoas a cada ano. 5 milhões são consumidores e mais de 600.000 são fumantes passivos ou expostos à fumaça de outras pessoas. Esta é uma mortalidade maior do que a causada por drogas e álcool juntos.',
        'O tabagismo é o fator responsável por 33% dos cânceres em homens e 10% em mulheres. Até 90% dos cânceres de pulmão são causados pelo tabaco.',
        'Os fumantes têm uma taxa de mortalidade superior a 70%, relacionada a doenças cardiovasculares, bronquite crônica, câncer de pulmão, enfisema pulmonar',
        'Se você fuma 20 cigarros, é o nível de aviso de poluição em uma cidade.',
        'Causa rugas prematuras nos lábios, olhos (pés de galinha), bochechas e queixo.',
        'Causa manchas nos dentes, infecções e cáries.',
        'Mau hálito, mau odor corporal e manchas nas mãos.',
        'As mulheres que fumam tabaco são menos propensas a engravidar. A combinação de obesidade, tabaco e cafeína reduz a probabilidade de ter um filho em 30%.',
        'Pode causar infertilidade masculina.',
        'Você sempre será melhor se você parar de fumar, nunca é tarde demais para fazer isso.',
        'A verdadeira face do tabaco é a doença, a morte e o horror, não o glamour e a sofisticação que a indústria do tabaco tenta retratar.',
        'Tabaco ajuda a perder peso: primeiro um pulmão e depois outro.',
        'Fumar mata. Se eles te matarem, você perdeu uma parte muito importante da sua vida.',
        'Fumo é odioso para cheirar, prejudicial para o cérebro e perigoso para os pulmões.',
        'Mil Brasileiros deixam de fumar todos os dias - morrendo'
    ]

    const phrasesDiabete = [
        'Olhe para cima, que é de lá que vem tua força!',
        'Agora é a hora de começar a surpreender aqueles que duvidaram de você!',
        'Não importa o que você decidiu. O que importa é que isso te faz feliz.',
        'Você nunca será velho demais para sonhar um novo sonho.',
        'Se não puder fazer tudo, faça tudo que puder.',
        'Valorize as pequenas conquistas.',
        'Por mais difícil que algo possa parecer, jamais desista antes de tentar!',
        'Comece onde você está. Use o que você tem. Faça o que puder.'
    ]

    if (results.motivational_phrase === 'diabete') {
        const randomIndex = Math.floor(Math.random() * phrasesDiabete.length);
        phrase = phrasesDiabete[randomIndex];
    }

    if (results.motivational_phrase === 'fumante') {
        const randomIndex = Math.floor(Math.random() * phrasesSmoker.length);
        phrase = phrasesSmoker[randomIndex];
    }

    return phrase;

}
