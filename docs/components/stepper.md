# Stepper

A stepper guides users through sequential multistep workflows by displaying progress, establishing context, and anchoring interaction milestones.

Steppers organize complex tasks into structured linear or non linear stages, reinforcing spatial orientation through visual indicators, descriptive titles, and synchronized view panels.

<br>

### Purpose

Steppers decompose extensive procedures such as checkouts, onboarding flows, configuration wizards, and multi stage forms into clear manageable milestones.

They communicate overall completion status, clarify the current working stage, and offer direct keyboard navigable checkpoints to review or modify previously entered information.

<br>

### Usage

Use steppers when:
* Workflows contain three or more logical phases that benefit from sequential completion.
* Users need clear orientation regarding their progress and remaining workload.
* Complex forms require logical chunking to reduce cognitive load and prevent input fatigue.
* Submitting data requires review and confirmation before final execution.

Do not use steppers when:
* Displaying simple binary or linear loading progress where a progress bar or spinner suffices.
* Navigating general website hierarchies where breadcrumbs or traditional navigation menus are appropriate.
* The sequence of steps is completely arbitrary with no operational relationship or dependency.

<br>

### Anatomy

The stepper adheres to a compound component architecture exposing dedicated primitives through dot notation, while supporting a zero boilerplate atomic interface through the root component:

* `Stepper`: The root context coordinator managing active step state, progression rules, orientation, and indicator templates.
* `Stepper.List`: The landmark navigation container organizing step milestones within an accessible ordered list structure.
* `Stepper.Item`: The individual milestone wrapper managing localized lifecycle states including active, completed, upcoming, and disabled.
* `Stepper.Trigger`: The interactive button container managing focus, tactile feedback, and milestone activation.
* `Stepper.Indicator`: The visual milestone marker encapsulating the Button primitive under the hood to render circular surfaces or horizontal progress bars.
* `Stepper.Title`: The primary step heading encapsulating the Label component under the hood to ensure consistent typography and semantic hierarchy.
* `Stepper.Description`: Auxiliary text encapsulating the Description component under the hood to deliver standard secondary typography tokens.
* `Stepper.Separator`: The connector line joining sequential milestone indicators.
* `Stepper.View`: The content panel container associated with a specific step value, rendering only when that milestone is active.

<br>

### Primitive Composition

The stepper composes existing core Homonoid primitives under the hood to guarantee visual consistency and reduce redundancy:

* `Button`: Powers `Stepper.Indicator` (and `Stepper.Trigger` when activated as an interactive touch target), inheriting full circular geometry, active hover lightness, tactile pressed scaling down to 0.97, and high contrast focus rings.
* `Label`: Powers `Stepper.Title`, ensuring standard label typography tokens, responsive line height, and color state responsiveness without custom font styling.
* `Description`: Powers `Stepper.Description`, delivering calibrated secondary typography tokens and muted foreground contrast across light and dark modes.

<br>

### Atomic Usage

For standard workflows, the stepper provides a declarative prop driven interface where milestone data and view panels are declared directly on the root component:

```tsx
import { Stepper } from "@homonoid/react";
import { UserIcon, CreditCardIcon, CheckCircleIcon } from "lucide-react";

export default function Example() {
  return (
    <Stepper
      defaultValue={1}
      variant="circle"
      steps={[
        {
          value: 1,
          title: "Account",
          description: "Provide personal profile credentials",
          icon: <UserIcon className="size-4" />,
          content: <div>Account configuration panel</div>
        },
        {
          value: 2,
          title: "Billing",
          description: "Configure payment method and currency",
          icon: <CreditCardIcon className="size-4" />,
          content: <div>Billing payment panel</div>
        },
        {
          value: 3,
          title: "Confirmation",
          description: "Review details and confirm order",
          icon: <CheckCircleIcon className="size-4" />,
          content: <div>Review and submit panel</div>
        }
      ]}
    />
  );
}
```

<br>

### Compound Usage

When customized layouts, badge accents, or non standard item hierarchies are needed, developers compose the primitives explicitly:

```tsx
import { Stepper, Button } from "@homonoid/react";

export default function Example() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Stepper value={currentStep} onValueChange={setCurrentStep}>
      <Stepper.List className="grid grid-cols-4 gap-4">
        {steps.map((step) => (
          <Stepper.Item key={step.value} step={step.value}>
            <Stepper.Trigger className="group flex w-full flex-col items-start gap-3">
              <Stepper.Indicator className="h-1 w-full rounded-full transition-colors group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary group-data-[state=inactive]:bg-surface-subtle" />
              <Stepper.Title className="text-sm font-medium transition-colors group-data-[state=active]:text-foreground group-data-[state=completed]:text-foreground group-data-[state=inactive]:text-foreground-muted">
                {step.title}
              </Stepper.Title>
            </Stepper.Trigger>
          </Stepper.Item>
        ))}
      </Stepper.List>

      <Stepper.View className="py-8 text-center text-sm">
        Active step content renders here
      </Stepper.View>
    </Stepper>
  );
}
```

<br>

### Layout

Steppers adapt their geometry to available canvas dimensions and workflow orientation:

* Horizontal: The standard layout for wide desktop surfaces where steps advance from left to right along a shared baseline.
* Vertical: The ideal orientation for narrow screens or workflows with extensive step descriptions, expanding downward sequentially.
* Proportional Distribution: Milestone items distribute evenly across the navigation container utilizing CSS grid or flexbox with equal column widths.
* Panel Isolation: `Stepper.View` separates navigation chrome from active form controls, preventing layout shifts during step transitions.

<br>

### Variants

Steppers support distinct indicator treatments tailored to density and visual intent:

* Circle (`variant="circle"`): The classic milestone treatment rendering circular indicators that house step numbers, glyph icons, or completion checkmarks.
* Bar (`variant="bar"`): A modern segmented progress line treatment where each milestone is represented by an indicator bar spanning above the step title.

<br>

### States

Each milestone item communicates its operational standing through explicit data state attributes:

* `Upcoming` (`data-state="inactive"`): Pending milestone awaiting user progression. Renders muted text and subtle surface borders.
* `Active` (`data-state="active"`): Current working milestone. Receives prominent primary surface tokens and aria current step semantics.
* `Completed` (`data-state="completed"`): Validated prior milestone. Displays brand primary or success tokens, indicating that requirements are satisfied.
* `Loading` (`data-state="loading"`): Asynchronous operation underway within the milestone, rendering an animated spinner inside the indicator.
* `Disabled` (`data-state="disabled"`): Milestone currently unavailable for direct navigation, suppressing pointer interactions.
* `Error` (`data-state="error"`): Validation failure detected on the milestone, highlighting the indicator and text with destructive tokens.

<br>

### Behavior

Steppers support both constrained linear workflows and flexible non linear navigation:

* Linear Progression: Users must complete and validate the current milestone before advancing to subsequent stages.
* Free Navigation: Users can activate any completed milestone or upcoming unlocked stage by clicking the milestone trigger.
* Keyboard Activation: Trigger buttons respond immediately to Enter and Space activation.
* Sequential Keys: When milestone list focus is active, arrow keys navigate focus sequentially across step triggers.

<br>

### Object Continuity

Transitions preserve spatial stability and component identity:

* Dimensional Stability: Indicator containers maintain identical physical width and height across active, completed, and error states, preventing text reflow.
* Color Crossfading: Background and border color transitions shift smoothly via CSS transition utilities without abrupt flickering.
* Icon Continuity: Swapping step glyphs for completion checkmarks utilizes subtle opacity and transform crossfading.

<br>

### Accessibility

Steppers enforce thorough accessibility standards:

* Semantic Roles: `Stepper.List` renders an ordered list element `<ol>` or applies navigation landmarks with a descriptive label.
* Current Milestone: The active milestone trigger explicitly specifies `aria-current="step"` to notify assistive technology.
* Descriptor Linkages: Step titles and descriptions connect to their parent milestone triggers through descriptive identifier references.
* Focus Management: Focus rings conform to Homonoid visual standards, remaining visible under high contrast modes and respecting reduced motion preferences.

