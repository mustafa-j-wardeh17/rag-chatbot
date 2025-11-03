import React from 'react'

const Hero = ({ title, subtitle, description, rag, locale }: { title: string, subtitle: string, description: string, rag: string, locale: string }) => {
    return (
        <div className="text-center h-screen w-full pt-32 flex flex-col items-center justify-center space-y-6 ">
            {/* Main heading with gradient */}
            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                        {title}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        {subtitle}
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                    {description}{" "}
                    <span className="font-semibold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                        {rag}
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
    )
}

export default Hero