
const sendMotivational = (data) => {
    console.log(`Sending Motivational Information: ${pickMotivational()}`);
}

module.exports = {
    sendMotivational
}

const pickMotivational = () => {
    const phrases = [
        'Olhe para cima, que é de lá que vem tua força!',
        'Agora é a hora de começar a surpreender aqueles que duvidaram de você!',
        'Não importa o que você decidiu. O que importa é que isso te faz feliz.',
        'Você nunca será velho demais para sonhar um novo sonho.',
        'Se não puder fazer tudo, faça tudo que puder.',
        'Valorize as pequenas conquistas.',
        'Por mais difícil que algo possa parecer, jamais desista antes de tentar!',
        'Comece onde você está. Use o que você tem. Faça o que puder.'
    ]

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}
