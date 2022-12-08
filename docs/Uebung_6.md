# Übung 6: E2E Testing

## Aktivierung-Workflow End-to-end testen

Jeder Kontakt in der Tabelle wird initial mit dem Status "inactive" erstellt. Wenn man auf "Send activation" klickt,
wird der Status auf "pending" gesetzt und einen Aktivierungslink an der E-Mail-Adresse des Kontakts gesendet. Wenn der
Kontakt auf diesem Link klickt, bekommt er eine Bestätigung und der Status wechselt auf "active".

### Aufgabe

Implementiert einen Test, der diesen Workflow überprüft. Der Test läuft End-to-end: Das echte Backend läuft im
Hintergrund.
Es existiert bereits eine [e2e.spec.ts](../frontend-vue/test/e2e/e2e.spec.ts) mit einem minimalen E2E-Tests, diese Datei
soll erweitert werden.

### Hinweise

E2E-Testing bedeutet folgendes:

- Wir dürfen uns nicht auf bestehende Daten verlassen und sollten unsere Testdaten selbst vorbereiten.
- Die E-Mail ist schwierig: wie können wir einen Klick auf dem Aktivierungslink simulieren?
  - Am besten nutzt man einen echten E-Mail Account. Das ist realistisch aber erfordert Zugriff auf einem
    E-Mail-Server
  - Alternativ kann man auf einem Testsystem einen Testservice wie [Mailhog](https://github.com/mailhog/MailHog)
    verwenden. Dies erlaubt uns, die E-Mails abzufangen und per HTTP GET Request abzufragen. Das ist allerdings dann
    eigentlich nicht mehr vollständig "End to End", aber für ein Testsystem vertretbar.
    Die produktive Anwendung nutzt "ganz normal" einen SMTP-Server, nur die Abfrage der E-Mail ist durch Mailhog
    drastisch einfacher.

Das Backend ist bereits konfiguriert, um mit einem lokalen Mailhog zu interagieren.
Um dieses zu starten, startet die run config `Mailhog` oder
führt `docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog` auf der Konsole aus.

[< Vorherige Übung](./Uebung_5.md) - [Nächste Übung >](./Uebung_7.md)
