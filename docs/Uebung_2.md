# Übung 2: Vue Komponente Unit-Testing

In dieser Übung werden Vue Komponente Testgetrieben (weiter-) entwickeln.

## Aufgabe 1: filter-Funktionalität in der CustomerTable hinzufügen

Es ist Zeit, die filter-Funktionalität in der Anwendung zu integrieren.

### Aufgabe

Integriert die filter-Funktionalität in [`CustomerTable.vue`](../frontend-vue/src/pages/customers/components/CustomerTable.vue).
Dafür brauchen wir ein kleines Formular mit einem Input-Feld und einem Submit-Button.
Ein Test ist bereits in [`CustomerTable.spec.ts`](../frontend-vue/src/pages/customers/components/CustomerTable.spec.ts) vorhanden, muss nur aktiviert werden und sollte am Ende grün sein.

### Hinweise

- Um das richtige Formular zu finden (auf der Seite gibt es ja ein weiteres Formular), bietet es sich an `<form role="search">` zu verwenden und das Formular dann über `getByRole("search")` zu finden.
- Das Standardverhalten von Browsern passt manchmal nicht zu modernen Webanwendungen.
- `<form>` sendet eigentlich ein Formular ab, in dem der Browser selbst die unter `<form action="...">` spezifizierte URL anspringt und den Inhalt des Formulars per `GET` oder `POST` mit schickt.
- Wenn man das nicht will, muss man das `submit`-Event von `<form>` abfangen und per `event.preventDefault()` das Default-Verhalten unterdrücken.
- In Vue geht das durch [eine Reihe von modifiern](https://vuejs.org/api/built-in-directives.html#v-on) sehr einfach, z.B. mit `<form @submit.prevent="handleSubmit">`.
  Damit wird `handleSubmit` aufgerufen und davor automatisch das Default-Verhalten unterbunden.

## Aufgabe 2: Einen neuen Customer hinzufügen

Wir wollen neue Customers hinzufügen können.
Dafür muss ein Formular implementiert werden, indem alle Attribute ausgefüllt werden können.

### Aufgabe

1. Entwickelt **testgetrieben** eine neue Komponente, die ein Formular zur Erstellung eines Customer darstellt.
   Der Customer wird leer initialisiert und alle Felder werden per `v-model` im Form eingebunden.
   Für die Adressen reicht es erstmal, wenn eine einzige Adresse initialisiert wird.
2. Emittiert ein Event, wenn man das `<form>` abgeschickt wird.
   Events lassen sich mittels [`defineEmits`](https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations) deklarieren.
   Auch hier ist nötig, mittels `<form @submit.prevent>` zu verhindern, dass der Browser das Formular selbst abschickt.
   Es bietet sich an, einen `<button type="submit">` hinzuzufügen, damit man sowohl mit dem Button als auch mit der Tastatur (Enter) speichern kann.
3. Setzt die Formularfelder zurück beim Abschicken des Formulars (d.h. auf eine leere Texte).
4. Integriert die neue Komponente in die [`CustomerPage.vue`](../frontend-vue/src/pages/customers/CustomerPage.vue).
   Wenn ein Customer emittiert wird, soll er in der Liste hinzugefügt und angezeigt werden.

[< Vorherige Übung](./Uebung_1.md) - [Nächste Übung >](./Uebung_3.md)
