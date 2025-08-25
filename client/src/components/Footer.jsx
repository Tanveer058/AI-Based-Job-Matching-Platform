export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} JobMatch AI. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
