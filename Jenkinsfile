pipeline {
  agent any

  tools {
    nodejs 'NodeJS18' // Match your configured NodeJS tool name
  }

  stages {
    stage('📥 Checkout Code') {
      steps {
        echo 'Cloning GitHub repo...'
        // Jenkins will auto-checkout code from Git
      }
    }

    stage('📦 Install Dependencies') {
      steps {
        echo 'Running npm install...'
        sh 'npm install'
      }
    }

    stage('🧪 Run Smoke Tests') {
      steps {
        echo 'Running npm test...'
        sh 'npm test'
      }
    }
  }

  post {
    success {
      echo '✅ All smoke tests passed!'
    }
    failure {
      echo '❌ Smoke tests failed!'
    }
  }
}
