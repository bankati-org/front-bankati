pipeline {
    agent any

    tools {nodejs "nodejs"}

    environment {
        GIT_URL = "https://github.com/bankati-org/front-bankati.git"
        DOCKER_TAG_NAME = 'latest'
        DOCKER_REGISTRY = 'soukaina915/bankati-front'
        DOCKER_REGISTRY_CREDENTIALS_ID = 'soukaina-docker-hub'
        MANIFEST_URL = 'https://github.com/bankati-org/front-manifest.git'
        GITHUB_CREDENTIALS = "github-soukaina"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                echo "Cloning code from branch..."
                git url: GIT_URL, branch: "main"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies..."
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install'
                }
            }
        }

//        stage('Run Unit Tests and Coverage') {
//            steps {
//                script {
//                    echo "Running Vitest tests..."
//                    sh 'npm run test' // -- --coverage
//                    // Archive the coverage report (assuming it's generated in a 'coverage' directory)
//                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
//
//                }
//            }
//        }
//
//        stage('Print JSON content') {
//            steps {
//                script {
//                    sh 'cat ./test-output.json'
//                }
//            }
//        }
//
//        stage("Sonarqube Analysis") {
//            environment {
//                SCANNER_HOME = tool 'sonar'  // sonar-scanner is the name of the tool in the manage jenkins> tool configuration
//            }
//            steps {
//                withSonarQubeEnv(installationName: 'sonar' , credentialsId: 'sonar') {
//                    sh "${SCANNER_HOME}/bin/sonar-scanner"
//
//                }
//            }
//        }
//
//        stage('Quality gate') {
//            steps {
//                script {
//                    waitForQualityGate abortPipeline: false ,  credentialsId: 'sonar'
//                }
//            }
//        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    echo "Building and pushing docker image..."
                    def dockerImage = docker.build("${DOCKER_REGISTRY}:${BUILD_NUMBER}")

                    docker.withRegistry('', DOCKER_REGISTRY_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Push Manifest Changes to Git') {
            steps {
                script {
                    def newImageTag = "soukaina915/bankati-front:${BUILD_NUMBER}" // Or use any versioning strategy
                    echo "New image tag: ${newImageTag}"

                    withCredentials([usernamePassword(credentialsId: GITHUB_CREDENTIALS, passwordVariable: 'GITHUB_PASSWORD', usernameVariable: 'GITHUB_USERNAME')]) {
                        git credentialsId: GITHUB_CREDENTIALS, url: MANIFEST_URL, branch: 'main'

                        sh """
                            sed -i 's|soukaina915/bankati-front:[^ ]*|${newImageTag}|' dev/deployment.yaml
                            echo "Updated image tag in deployment.yaml to ${newImageTag}"
                            cat dev/deployment.yaml
                        """

                        sh """
                            git status
                            git add dev/deployment.yaml
                            git commit -m "Update Kubernetes manifests for deployment"
                            git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/bankati-org/front-manifest.git main
                        """
                    }
                }
            }
        }
    }


    post {
        always {
            // Cleanup workspace after build
            cleanWs()
        }
        success {
            // Actions on successful deployment
            echo 'Deployment successful!'
        }
        failure {
            // Actions on failed deployment
            echo 'Deployment failed!'
        }
    }
}
