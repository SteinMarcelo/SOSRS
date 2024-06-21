document.getElementById('symptom-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    const symptoms = document.getElementById('symptoms').value.toLowerCase().split(',').map(s => s.trim());
    const resultDiv = document.getElementById('result');

    // Carrega o arquivo JSON com as doenças e sintomas
    fetch('./diseases.json')
        .then(response => response.json())
        .then(possibleDiseases => {
            // Filtra as doenças que têm pelo menos um dos sintomas fornecidos
            const matchedDiseases = possibleDiseases.filter(disease => 
                symptoms.some(symptom => disease.symptoms.includes(symptom))
            );

            // Exibe os resultados na div de resultados
            if (matchedDiseases.length > 0) {
                resultDiv.innerHTML = '<h2>Possíveis doenças:</h2><ul>' + 
                    matchedDiseases.map(disease => '<li>' + disease.disease + '</li>').join('') + 
                    '</ul>';
            } else {
                resultDiv.innerHTML = '<h2>Nenhuma doença encontrada para os sintomas fornecidos.</h2>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            resultDiv.innerHTML = '<h2>Erro ao carregar os dados de doenças.</h2>';
        });
});
