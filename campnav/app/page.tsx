"use client"
import Image from "next/image";
import Wave from '../public/waves.svg'
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col relative" style={{fontFamily: 'Caveat, cursive'}}>
      {/* Main content section with solid dark background */}
      <div style={{ 
        backgroundColor: '#001220',
        width: '100%',
        minHeight: '100vh',
      }} className="flex flex-col relative z-10 overflow-hidden">
        
        {/* Floating icons - only in hero section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Stars */}
          <div className="absolute top-[10%] left-[15%] text-6xl animate-bounce" style={{animationDuration: '3s'}}>⭐</div>
          <div className="absolute top-[25%] right-[20%] text-5xl animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>✨</div>
          <div className="absolute bottom-[60%] left-[10%] text-4xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>🌟</div>
          
          {/* Camping related */}
          <div className="absolute top-[40%] right-[10%] text-6xl animate-pulse" style={{animationDuration: '3s'}}>🏕️</div>
          <div className="absolute top-[60%] left-[25%] text-5xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}>🎪</div>
          <div className="absolute bottom-[30%] right-[15%] text-4xl animate-pulse" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>⛺</div>
          
          {/* Nature elements */}
          <div className="absolute top-[70%] left-[5%] text-5xl" style={{animation: 'float 6s ease-in-out infinite'}}>🌲</div>
          <div className="absolute top-[15%] right-[30%] text-4xl" style={{animation: 'float 5s ease-in-out infinite', animationDelay: '1s'}}>🔥</div>
          <div className="absolute bottom-[45%] right-[25%] text-5xl" style={{animation: 'float 7s ease-in-out infinite', animationDelay: '2s'}}>🎒</div>
          
          {/* More scattered elements */}
          <div className="absolute top-[80%] right-[5%] text-4xl animate-bounce" style={{animationDuration: '4s'}}>🌙</div>
          <div className="absolute top-[50%] left-[35%] text-3xl animate-pulse" style={{animationDuration: '3s', animationDelay: '1.5s'}}>🦌</div>
          <div className="absolute bottom-[70%] right-[40%] text-4xl" style={{animation: 'float 5.5s ease-in-out infinite', animationDelay: '0.5s'}}>🏞️</div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>

        {/* <nav className="flex items-center justify-around bg-[#ff0088] py-7 w-3/4  rounded-md mx-auto">
          <div>
            <Link className="text-white text-4xl" href={'/'}>loc.</Link>
          </div>
          <div className="flex items-center justify-between gap-20">
            <div>
              <Link className="text-white text-4xl" href={'/'}>browse</Link>
            </div>
            <div>
              <Link className="text-white text-4xl" href={'/'}>create</Link>
            </div>
          </div>
        </nav> */}

        <section className="flex flex-col justify-center items-center flex-1 px-8 text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">findIT</h1>
            <div className="h-1 w-32 bg-[#ff0088] mx-auto"></div>
          </div>
          
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
              Discover Amazing Camps <br />for Your Kids
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed">
              From adventure camps to creative workshops, find the perfect 
              experience that will make this summer unforgettable. Create your 
              own camp or explore hundreds of exciting options.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link 
                href="/browse" 
                className="bg-[#ff0088] text-white px-10 py-4 rounded-full text-2xl hover:bg-[#e0007a] transition-colors shadow-lg"
              >
                Browse Camps
              </Link>
              <Link 
                href="/create" 
                className="bg-white text-[#001220] px-10 py-4 rounded-full text-2xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Create a Camp
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Info Cards Section */}
      <section className="bg-[#001220] py-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-5xl md:text-6xl text-white text-center mb-16 font-bold">Why Choose loc?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-[#ff0088] border-2 backdrop-blur-sm hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-3xl text-[#ff0088] mb-2">🎯 Curated Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white text-xl leading-relaxed">
                  Handpicked camps vetted for quality, safety, and fun. Every camp on our platform meets high standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-[#ff0088] border-2 backdrop-blur-sm hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-3xl text-[#ff0088] mb-2">📍 Easy Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white text-xl leading-relaxed">
                  Find the perfect camp near you with our smart location-based search and filtering system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-[#ff0088] border-2 backdrop-blur-sm hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-3xl text-[#ff0088] mb-2">✨ Create Your Own</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white text-xl leading-relaxed">
                  Camp organizers can easily list their programs and reach thousands of excited families.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer section with wave background */}
      <footer 
        style={{ 
          backgroundImage: `url(${Wave.src})`,
        }}
        className="w-screen h-screen bg-cover bg-bottom bg-no-repeat bg-[#001220]">
      </footer>
    </div>
  );
}
