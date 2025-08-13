# **App Name**: ScreenFlow

## Core Features:

- Screen Management: Manages the navigation and transition between four distinct screens: Team, Stats, Clips, and Configuration.
- Bottom Navigation Bar: Displays a floating 'pill' shaped navigation bar at the bottom of the screen with smooth transitions between active and inactive states.
- Blur Filter: Applies a blur effect to the content behind the navigation bar, creating a frosted glass appearance.
- Responsive UI/UX: Adapts the UI/UX for different screen sizes, ensuring a responsive design that transitions smoothly from mobile to PC or larger screens.

## Style Guidelines:

- Primary color: Blue (#007BFF) for active states and interactive elements.
- Background color: Dark gray (#333333) desaturated to 20% for the screen backgrounds.
- Accent color: Light blue (#74c0fc), a cooler, brighter color for highlighting selected elements.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text to maintain a clean, modern look.
- Simple, line-style icons for navigation items; white when active, gray when inactive.
- Floating navigation bar with rounded corners at the bottom of the screen, ensuring it's not directly attached to the edges.
- Smooth transition animations for screen changes within the PageView and for state changes of the navigation bar items.
- Utilize Flutter's layout builders to adapt the layout based on screen size and orientation.