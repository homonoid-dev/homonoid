# Orb

An orb provides real time voice agent presence feedback, communicating voice activity states and dynamic audio reactivity while preserving spatial continuity and dimensional stability.

Voice orbs communicate operational readiness, active listening, cognitive processing, and speech generation through atmospheric visual surfaces.

<br>

### Purpose

Voice orbs establish an expressive focal landmark for conversational artificial intelligence interfaces.

They provide immediate visual confirmation across every phase of a spoken conversation, assuring users that their spoken input is registered, comprehended, and answered.

<br>

### Usage

Use voice orbs as primary controls or ambient status surfaces within voice agent applications, push to talk interfaces, audio narration environments, and live speech transcription sessions.

Place the voice orb centrally within dedicated voice interfaces, or position it as a floating assistant trigger within broader applications.

Avoid placing multiple active voice orbs within the same viewport when a single localized surface communicates conversation state.

<br>

### Anatomy

A voice orb consists of the following elements:

- `Container`: The bounded geometric boundary establishing the dimensional envelope.
- `Aura`: An ambient atmospheric glow extending beyond the perimeter to convey energy and operational presence.
- `Core`: The central reactive visual surface expressing dynamic audio modulation through fluid gradients or rhythmic bars.
- `Status Descriptor`: A programmatic live announcement for assistive technologies communicating state transitions.

<br>

### Layout

Voice orbs maintain strict dimensional stability across every state transition:

- Alignment: Geometry remains centered along horizontal and vertical axes within its allocated bounding box.
- Bounding Box: Standardized scales preserve optical balance across compact controls and immersive viewport surfaces.
- Continuity: State changes alter internal velocity, scale, and coloration without shifting surrounding page content.

<br>

### Themes

Harmonia defines two expressive visual themes for voice surfaces:

- `Cloud`: An atmospheric luminous sphere theme featuring fluid state paced motion and volume reactive radial glow.
- `Bars`: A waveform audio visualization theme comprising five vertical rounded pill bars dynamically modulating in height and breathing cadence.

<br>

### States

Voice orbs express six conversational lifecycle states:

- `Idle`: Resting state indicating active connection and readiness to receive user speech input.
- `Connecting`: Transitory initialization state communicating session handshake and audio pathway setup.
- `Listening`: Receptive state indicating active microphone listening and responsiveness to user speech input.
- `Thinking`: Processing state communicating cognitive deliberation or inference before output generation begins.
- `Speaking`: Expressive output state indicating the assistant is actively verbalizing audio responses.
- `Error`: Alert state indicating communication interruption, microphone access denial, or pipeline failure.

<br>

### Behavior

Voice orbs respond dynamically to acoustic volume envelopes and programmatic session signals:

- Audio Responsiveness: Signal volume between zero and one scales bar elevations and cloud luminosity in real time.
- State Branching: Conversational states dictate baseline animation cadences, particle velocity, and focal coloration.
- Interactive Affordance: When configured as an interactive trigger, the orb accepts keyboard activation and pointer presses.

<br>

### Object Continuity

Harmonia requires that voice indicators maintain unbroken material continuity:

- Dimensional Reservation: Transitioning between idle, listening, and speaking states preserves container dimensions to prevent layout jitter.
- Interpolated Velocity: Motion transitions smoothly decelerate and accelerate between processing cadences.
- Theme Continuity: Visual accents originate strictly from design tokens, harmonizing across light and dark modes.

<br>

### Motion

Motion parameters adhere strictly to design tokens:

- Cadence: Resting cycles animate between 1200ms and 2400ms using standard easing curves.
- Compositing: Driven exclusively by hardware composited transforms and opacity layers to ensure 60fps rendering.
- Reduced Motion: System motion preferences automatically suppress rapid oscillations in favor of gentle opacity transitions.

<br>

### Accessibility

Every voice orb implementation must satisfy accessibility standards:

- Semantic Role: Rendered with status role semantics and polite live region announcements during passive monitoring.
- Interactive Role: Rendered with button role semantics, tab stop focus rings, and keyboard triggers when interactive.
- Dynamic Announcements: Live screen reader text describes conversational state shifts clearly.
- Motion Mitigation: Respects prefers reduced motion settings by limiting displacement and maintaining static baselines.

<br>

### Platform Notes

Web implementations observe standard platform patterns:

- Hardware Composited Vectors: Rendered using SVG vector geometry and CSS transforms for resolution independence.
- Spatial Scaling: Dimensions scale according to tokenized spatial variables rather than arbitrary viewport units.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: Consumes colors, dimensions, and motion timing from design tokens.
- Web Implementation: Built in the React component package using React 19, TypeScript, and Tailwind CSS v4.
