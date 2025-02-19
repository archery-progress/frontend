import LoginForm from "./login-form"


export default function PageLogin() {
  return (
    <div className="">
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex relative h-full flex-col">
          <div>
            <div className="relative flex items-center text-lg font-medium">
              <img className="w-20 rounded-md" src="/logo.webp" />
            </div>
          </div>
          <LoginForm />
        </div>
        
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and helped me deliver
                stunning designs to my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
      
      </div>
    </div>
  )
}

