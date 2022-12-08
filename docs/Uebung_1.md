# Übung 1: Unit-Testing mit Jest

In dieser Übung geht es darum, Jest und JavaScript/TypeScript Unit-Tests kennenzulernen.
Es wird daher erstmal ohne UI entwickelt.

## Implementierung eines Suchalgorithmus

Wir wollen eine Methode implementieren, die eine Liste von `Customer` Objekte anhand einer Textinput durchsucht und eine
reduzierte Liste der passenden Customers zurückgibt.
Eine Test-Datei und eine leere Klasse liegen bereits als [`searchCustomer.spec.ts`](../frontend-vue/src/services/searchCustomer.spec.ts) und [`searchCustomer.ts`](../frontend-vue/src/services/searchCustomer.ts) vor.

Für den Anfang sind die Tests bereits geschrieben und nur die zu implementierende Funktion ist noch leer.
Anschließend geht es aber mit dem "vollständigen" weiter und es müssen auch eigene Tests geschrieben werden.

### Aufgabe

1. Implementiert [`searchCustomer.ts`](../frontend-vue/src/services/searchCustomer.ts)
   1. aktiviert einen durch das `it.skip` deaktivierten Test (indem ihr das `.skip` löscht)
   2. der Test sollten nun fehlschlagen
   3. implementiert die vom Test erwartete Funktionalität, bis der Test grün ist
   4. überlegt euch mögliche Verbesserungen an der Implementierung und setzt diese um
   5. macht mit dem nächsten deaktivierten Test weiter
2. Implementiert Unterstützung für mehrere Wörter beim Filtern:
   Schreibt zuerst den Test, dann die Implementierung für die folgenden Ergänzungen:
   1. Angenommen, der Benutzer gibt mehrere Wörter ein.
      Dann wird jede `Customer` zurückgegeben, bei der mindestens eines der Wörter gefunden wird.
   2. Die Klein- und Großschreibung wird in der Suche ignoriert: 
      Angenommen, der Benutzer sucht nach "benjamin". 
      Dann wird die `Customer` mit Vorname "Benjamin" zurückgegeben. 
      Das gilt für alle von der Suche betroffenen Attribute.

### Hinweise

Das Ziel ist, testgetrieben zu entwickeln. Beachtet also die folgenden Punkte:

- Die Akzeptanzkriterien können als Basis für die Testfälle verwendet werden.
- Erst einen Test schreiben, dann die Lösung implementieren
- Zuerst die einfachste Lösung implementieren, dann refactoren.
- Immer alle Tests ausführen, um sich vor Regressionen zu schützen

[Nächste Übung >](./Uebung_2.md)
