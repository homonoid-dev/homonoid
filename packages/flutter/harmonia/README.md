# Harmonia (Flutter)

[![Pub Version](https://img.shields.io/pub/v/harmonia.svg)](https://pub.dev/packages/harmonia)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Harmonia is a cross-platform design system built around continuity.

This package provides the official Flutter implementation of Harmonia components, motion transitions, design tokens, and accessibility extensions.

<br>

### Philosophy

Unlike traditional UI libraries, Harmonia treats user interfaces as connected physical systems. Components preserve their object identity and evolve naturally between states rather than being replaced or appearing/disappearing as disconnected views.

- **Continuity**: Smooth transitions that preserve user context.
- **Platform Excellence**: Embracing platform-native behaviors while preserving design language intent.
- **Accessibility by Default**: High contrast, semantic structures, and reduced-motion support.

<br>

### Installation

Add `harmonia` to your `pubspec.yaml`:

```yaml
dependencies:
  harmonia: ^0.1.0-dev.1
```

<br>

### Quick Start

Wrap your application in `HarmoniaTheme`:

```dart
import 'package:flutter/material.dart';
import 'package:harmonia/harmonia.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: Theme.light(),
      darkTheme: Theme.dark(),
      home: const Scaffold(
        body: Center(
          child: Text('Welcome to Harmonia'),
        ),
      ),
    );
  }
}
```

<br>

### Documentation

For complete design specifications, component guidelines, and motion architecture, visit the [Harmonia Documentation](../../../docs/README.md).

<br>

### License

© Lumunar. Distributed under the MIT License.
