export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-32 px-4">
      <div className="text-center space-y-6 max-w-4xl">
        {/* Main heading with gradient */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              RAG Chatbot
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            AI-Powered document assistant with{" "}
            <span className="font-semibold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
              Retrieval-Augmented Generation
            </span>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </main>
  );
}
