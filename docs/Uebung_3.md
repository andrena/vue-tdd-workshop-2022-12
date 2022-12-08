# Übung 3: Test Isolation und Server Interaktion

## Promises in Tests & Server-Responses mocken

Die Komponente [`CustomerTable.vue`](frontend-vue/src/pages/customers/components/CustomerTable.vue) initialisiert noch
die `customers` in der Tabelle hardcoded im `script`.
Wir wollen aber diese Daten aus dem Backend abfragen.

Wir haben bereits eine [`httpRequest`](../frontend-vue/src/services/httpRequest.ts) Funktion implementiert, die
asynchrone HTTP Anfragen macht.
In [`httpRequest.spec.ts`](../frontend-vue/src/services/httpRequest.spec.ts) wird sie getestet.
Die Tests verwenden ein [`backendMock`](frontend-vue/src/test-utils/backendMock.ts), was konfiguriert werden kann, um
gewisse Netzwerkanfragen zu erwarten und darauf zu antworten (API
siehe [`HTTPMockConfig`](../frontend-vue/test/base/HTTPMockConfig.ts)).

### Aufgabe 3.1: Customer in der CustomerPage vom Backend laden

Wie immer entwickeln wir testgetrieben.

1. Nutzt [`httpRequest`](../frontend-vue/src/services/httpRequest.ts)
   in [`CustomerPage.vue`](../frontend-vue/src/pages/customers/CustomerPage.vue), um die
   Customer asynchron zu laden (die bisherigen hardcoded Testdaten sollen gelöscht werden).
2. Nutzt [`httpRequest`](../frontend-vue/src/services/httpRequest.ts), um neue Customer anzulegen.

Denkt dran, dass keine unresolved Promise hängenbleiben darf (das würde die folgenden Tests beeinflussen)!

### Aufgabe 3.2: CustomerRepository

Die Customer direkt in der [`CustomerPage.vue`](../frontend-vue/src/pages/customers/CustomerPage.vue) zu verwalten und
abzufragen ist unpraktisch.
Die Seite muss sich sowohl um Datenabfragen und -verwaltung als auch um die Anzeige kümmern.
Dadurch werden die Tests schnell unübersichtlich und können aus vielen unterschiedlichen Gründen scheitern.

Wir schlagen daher vor, die Datenverwaltung auszulagern.
Das Interface [`CustomerRepository`](../frontend-vue/src/services/CustomerRepository.ts) definiert eine Struktur, die
man für die Datenverwaltung verwenden kann.

1. Entwickelt testgetrieben ein [`CustomerRepositoryImpl`](../frontend-vue/src/services/CustomerRepositoryImpl.ts),
   das [`CustomerRepository`](../frontend-vue/src/services/CustomerRepository.ts) implementiert.
   Ihr könnt Teile von der Tests der Page wiederverwenden.
2. Nutzt den [Provide/Inject Mechanismus](https://vuejs.org/guide/components/provide-inject.html) von Vue, um die
   Repository per Dependency Injection in der [`CustomerPage.vue`](../frontend-vue/src/pages/customers/CustomerPage.vue)
   zu bekommen.
   Achtet darauf, dass die Tests noch laufen!
   1. Statt direkt `inject` in der Page aufzurufen, könnt
      ihr [`injectOrThrow`](../frontend-vue/src/services/injectOrThrow.ts) verwenden.
      Diese Funktion verwendet die typsichere Art, in Vue dependencies abzufragen und stellt gleichzeitig sicher, dass
      die Dependency nicht `null` ist (ansonsten wird ein Fehler geworfen).
   2. Der Provide kann global in der [`main.ts`](../frontend-vue/src/main.ts) erfolgen.
3. Nutzt jetzt das Repository in der [`CustomerPage.vue`](../frontend-vue/src/pages/customers/CustomerPage.vue), um die
   direkte Abhängigkeit zum Netzwerk abzulösen.
4. Implementiert einen `CustomerRepositoryMock`.
   Das ist eine stark vereinfachte Version von `CustomerRepository` (ohne Netzwerk-Interaktion), die anschließend in den
   Tests verwendet werden kann, um nicht mehr die Netzwerkaufrufe abfangen zu müssen.

### Bonusaufgaben

1. Implementiert das Löschen von Kontakten.
2. Achtet darauf, dass die Daten konsistent bleiben, auch wenn mehrere Kontakte gleichzeitig gelöscht werden!
3. Implementiert eine Fehlerhandlung, die eine Nachricht anzeigt, wenn eine Backend-Request nicht erfolgreich war.
   Wie kann man das sinnvoll testen?
4. Leere Tabellen, die sich ur-plötzlich mit Daten füllen, sind überraschend für Nutzer.
   Integriert den Lade-Indikator, um anzuzeigen, dass gerade noch etwas nachgeladen wird.
   Das wird in Zukunft deutlich einfacher sein, wenn [`top-level await` und `Suspense`](https://vuejs.org/api/sfc-script-setup.html#top-level-await) in Vue 3 stabil verfügbar sind.
   Aktuell ist es leider nur experimentell und `@testing-library/vue` unterstützt es nicht, daher empfehlen wir vorerst ein simples boolean-Flag zu verwenden.

### Hinweise

Die folgende Backend-Endpunkte sind verfügbar:

- `GET /api/` gibt alle Customer zurück
- `POST /api/` erstellt einen neuen Customer.
  Erwartet als POST-body einen `CustomerUnsaved` (d.h. `Customer` ohne `id` und `status`)
- `DELETE /api/:id` löscht einen Customer

Um asynchronen Operationen die Chance geben zu können, weiterzulaufen,
ist [`flushPromises`](../frontend-vue/src/test-utils/flushPromises.ts) hilfreich.

[< Vorherige Übung](./Uebung_2.md) - [Nächste Übung >](./Uebung_4.md)
