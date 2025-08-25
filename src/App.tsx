import { useState } from 'react';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [quizStart, setQuizStart] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout setDialogOpen={setDialogOpen} quizStart={quizStart}>
        <Home dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} quizStart={quizStart} setQuizStart={setQuizStart} />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
