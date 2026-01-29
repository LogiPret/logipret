"use client";

export default function DemoPage() {
  return (
    <div
      className="min-h-screen bg-black text-white flex items-center justify-center"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(252, 183, 35, 0.15) 2px, transparent 2px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="w-full max-w-5xl px-4">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/Kkl0RE58qyw?autoplay=1"
            title="LogiText Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
