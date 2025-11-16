# @umituz/react-native-design-system-atoms

Atomic design components for React Native - Primitive UI components following Material Design 3 principles.

## ✨ Features

- 🎨 **Material Design 3** - Modern, accessible UI components
- ⚛️ **Pure React Native** - No external UI library dependencies
- 🧬 **Atomic Design** - Primitive components (atoms)
- 🌓 **Theme Support** - Built-in light/dark mode via `@umituz/react-native-design-system-theme`
- 📱 **Responsive** - Adaptive layouts for phones and tablets
- ♿ **Accessible** - WCAG AA compliant components
- 📦 **Zero Config** - Works out of the box
- 🪶 **Lightweight** - Smaller bundle size

## 📦 Installation

```bash
npm install @umituz/react-native-design-system-atoms
```

### Peer Dependencies

```bash
npm install @umituz/react-native-design-system-theme @umituz/react-native-icon @umituz/react-native-design-system-typography
npm install react@18.3.1 react-native@0.76.3 react-native-reanimated@~3.10.1 react-native-svg@^15.0.0
```

## 🚀 Usage

```typescript
import {
  AtomicButton,
  AtomicText,
  AtomicInput,
  AtomicCard,
} from '@umituz/react-native-design-system-atoms';

const MyComponent = () => {
  return (
    <AtomicCard variant="elevated" padding="lg">
      <AtomicText type="headingLarge">Welcome</AtomicText>
      <AtomicInput
        label="Email"
        placeholder="Enter your email"
        variant="outlined"
      />
      <AtomicButton
        variant="primary"
        onPress={() => console.log('Pressed')}
      >
        Submit
      </AtomicButton>
    </AtomicCard>
  );
};
```

## 🧩 Components

### Available Atoms

- `AtomicButton` - Buttons with variants (primary, secondary, outline, text, danger)
- `AtomicText` - Typography with MD3 type scale
- `AtomicInput` - Text inputs with validation states
- `AtomicTextArea` - Multiline inputs with character counter
- `AtomicCard` - Container cards with elevation
- `AtomicIcon` - Lucide icons wrapper
- `AtomicSwitch` - Toggle switches
- `AtomicBadge` - Status badges
- `AtomicProgress` - Progress indicators
- `AtomicAvatar` - User avatars
- `AtomicChip` - Chips/tags
- `AtomicDivider` - Dividers
- `AtomicFab` - Floating action buttons
- `AtomicFilter` - Filter chips
- `AtomicTouchable` - Touchable wrapper
- `AtomicDatePicker` - Date picker
- `AtomicPicker` - Picker component
- `AtomicSearchBar` - Search input
- `AtomicSort` - Sort component
- And more...

## 🌓 Theme Integration

This package requires `@umituz/react-native-design-system-theme`:

```typescript
import { ThemeProvider } from '@umituz/react-native-design-system-theme';
import { AtomicButton } from '@umituz/react-native-design-system-atoms';

const App = () => (
  <ThemeProvider>
    <AtomicButton variant="primary" onPress={() => {}}>
      Click me
    </AtomicButton>
  </ThemeProvider>
);
```

## 📖 Documentation

Full documentation: [Coming Soon]

## 🤝 Contributing

Contributions welcome! This is part of the universal design system used across 100+ React Native apps.

## 📄 License

MIT © Umit Uz




