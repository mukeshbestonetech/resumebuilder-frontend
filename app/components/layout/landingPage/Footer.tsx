export default function LandingFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} ResumeBuilder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}