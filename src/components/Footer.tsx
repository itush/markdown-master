import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex border-t mt-4 gap-2 justify-center 
    text-center text-sm text-slate-600">
      <p>Status: 🟠 WIP | </p>

      {/* <p>Status: 🟢 All Systems Up</p>
      <p>Status: 🔴 Error</p>
      <p>Status: 🔶 Alpha</p>
      <p>Status: 🔵 Beta </p>
      <p>Status: 💛 Maintenance </p> */}

      <p>

        Made with ❤️ by <Link href="https://github.com/itush" target="_blank" className='italic'>Tushar Biswas</Link>
      </p>
    </footer>
  )
}

// WIP (Work In Progress): 🔴 (Red)
// Indicates that the application is still under development and not yet ready for production use.
// All Systems Up: 🟢 (Green)
// Indicates that all systems are functioning normally and the application is available for use.
// Maintenance Mode: 💛 (Yellow)
// Indicates that the application is currently undergoing maintenance and may be unavailable or have limited functionality.
// Error/Down: 🔴 (Red)
// Indicates that the application is experiencing errors or is currently down and unavailable.
// Beta: 🔵 (Blue)
// Indicates that the application is in a beta testing phase and may have some known issues or limitations.
// Alpha: 🔶 (Purple)
// Indicates that the application is in an alpha testing phase and may have significant issues or limitations.
