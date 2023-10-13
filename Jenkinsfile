pipeline {

    agent any;  

    tools{
        nodejs 'NODE_20.4.0'
    }

    stages {
        stage('Dependencias') {
            steps {
                echo "Instalando dependências"
                sh 'npm install'
            }
        }
        stage('NPM Build') {
            steps {
                echo "Instalando dependências"
                sh 'npm run build'
            }
        }
        stage('Sonar Analise') {
            environment{
                scannerHome = tool 'SONAR_SCANNER'
            }
            steps {
                withSonarQubeEnv('SONAR'){
                    sh "${scannerHome}/bin/sonar-scanner -e -Dsonar.projectKey=alvara-frontend  -Dsonar.sources=. -Dsonar.host.url=http://cloudtecnologia.dynns.com:9000 -Dsonar.login=5605b7c0c108614835d7512ba6588e4f1671b4a1"
                }
            }
        }
        stage('Sonar QualityGate') {
            steps {
                sleep(20)
                timeout(time: 1, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Imagem Docker') {
            steps {
                echo "Imagem Docker" 
                sh 'docker build -t alvara-frontend:latest .'           
            }
        }
        stage('Deploy'){
            steps {
               sh 'docker-compose build'
               sh 'docker-compose up -d'
            }
        }
        stage('Limpando Cache'){
           steps {
                sleep(10)
                sh 'docker system prune -f'
                sh 'docker ps'
           }
        } 
    }

   post{
        always {
            script {
                if (currentBuild.result == 'FAILURE') {
                    echo "Build Com erro(s)!"
                    emailext attachLog: true, body: 'LOG:', subject: "BUILD ${BUILD_NUMBER} alvara-frontend Executado com Erro(s)!", to: 'thi4go19+jenkins@gmail.com'
                } else {
                    echo "Build bem-sucedido!"
                    emailext attachLog: true, body: 'LOG:', subject: "BUILD ${BUILD_NUMBER} alvara-frontend Executado com Sucesso!", to: 'thi4go19+jenkins@gmail.com'
                }
            }
        }
   }

}