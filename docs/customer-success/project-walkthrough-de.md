# Dein fertiges CSM-Lab: Schritt für Schritt

## Was wirklich passiert ist

Für das Projekt wurden das Azure-Abonnement, das EUR-1-Budget und eine Static Web App im Free-Tarif eingerichtet. GitHub ist verbunden und die Veröffentlichung läuft automatisch. Website und API laufen wirklich in Azure.

Die technische Umsetzung, Tests und Dokumentation sind vollständig. Die Fehlerübungen wurden lokal ausgeführt; es waren keine echten Azure-Störungen und keine realen Kundenfälle.

## 1. Einen Kundenfall als Ausgangspunkt festlegen

CloudShop ist eine erfundene E-Commerce-Firma. Ihr Support braucht eine gemeinsame Anlaufstelle für Status und nächste Schritte. Daraus ergeben sich drei Ziele: funktioniert das Portal, können wir eine Störung behandeln, kann ein Nutzer das Portal verstehen?

Die Fallstudie zeigt, dass du vor Technik zuerst nach dem Kundenproblem fragst.

## 2. Portal und API in Azure bereitstellen

GitHub enthält die Dateien. GitHub Actions überträgt sie an Azure Static Web Apps. Azure stellt die Website bereit und führt die kleine Function für /api/health aus.

Website = die sichtbare Oberfläche. API = eine technische Schnittstelle, die eine strukturierte Antwort liefert. HTTP 200 bedeutet, diese konkrete Anfrage wurde erfolgreich beantwortet. operational bezieht sich hier nur auf diesen Prüfendpunkt.

Die regionalen Einstellungen stehen auf Central US. Der Name der Ressourcengruppe mit weu ist nur ein Name; er verschiebt keine Ressource nach Europa.

## 3. Die Veröffentlichung prüfen

Ich habe die öffentliche Website, CSS-/JavaScript-Dateien und API per HTTP geprüft. Außerdem die ausgelieferten Sicherheitsheader. Ergebnisse und UTC-Zeiten stehen in docs/evidence/live-verification.json.

Der Prüfendpunkt verrät keine Kunden- oder Zahlungsdaten. Ein erfolgreicher Abruf ist eine Momentaufnahme, keine Garantie für dauerhafte Verfügbarkeit.

## 4. Drei Fehlerübungen ausführen

Alle in einer lokalen Umgebung:

- API HTTP 503: Ich habe die Test-API auf unavailable gesetzt. Die Website blieb erreichbar, aber der Status wechselte auf Degraded/Unavailable. Nach dem normalen Modus kam HTTP 200 zurück.
- API HTTP 403: Ich habe access-denied simuliert. Die Oberfläche zeigt den konkreten HTTP-Fehler. Das ist keine Änderung an Azure-Berechtigungen.
- Ungültige Konfiguration: Eine temporäre Testkopie bekam absichtlich ungültiges JSON. Die Validierung schlug fehl; die unveränderte gültige Projektkopie bestand wieder.

Die Programme protokollieren Zeit, Fehler und Wiederherstellung. Solche schnellen automatisierten Übungen sind keine gemessene Bearbeitungszeit eines menschlichen Supportfalls.

## 5. Kundenkommunikation ergänzen

Ich habe eine erste Meldung, technische Übergabe, Zwischenstand und Abschluss geschrieben. Jede enthält Auswirkung, geprüfte Information und nächsten Schritt.

Beispiel: „Die Seite ist erreichbar, die Prüf-API liefert 503. Eure Bestellungen prüft diese API nicht.“ Das verhindert, dass ein technischer Fehler größer dargestellt wird, als die Daten belegen.

Die Nachrichten sind Rollenspiel und wurden niemandem geschickt.

## 6. Onboarding prüfen

Ich habe die Oberfläche funktional geprüft: Status finden, Health-Beispiel ansehen, Artikel öffnen, Eskalationsweg erklären.

Du oder ein freiwilliger Testnutzer müsst die Aufgaben noch einmal ohne Hilfe machen. Erst danach kann man behaupten, selbstständige Nutzung sei nachgewiesen.

## 7. Kunden-Health verstehen

Eine grüne API ist nicht gleich ein erfolgreicher Kunde. Dafür braucht man Nutzung, offene Probleme, Ansprechpartner, Nutzen und Kosten.

Ein Teil der technischen Lab-Evidenz ist vorhanden. Echte Nutzung und Kundenkontakt fehlen. Deshalb bleibt der aktuelle Gesamtwert unbekannt. Das 57,5-Punkte-Beispiel ist ausdrücklich erfunden.

## 8. Kosten bewerten

Dein Tarif ist Free und das Budget EUR 1. Azure zeigt zunächst „No cost reported“, noch keine Kostendaten oder Prognose. Ich habe deswegen keine garantierten Nullkosten behauptet und keine kostenpflichtigen Dienste aktiviert.

Das Budget alarmiert; es ist kein automatischer Aus-Schalter.

## 9. Abschlussreview schreiben

Empfehlung: kleinen Pilot fortführen, unabhängigen Nutzungstest machen, Kosten nachprüfen und den Bedarf an laufender Überwachung klären.

Wir versprechen keine Zeitersparnis ohne Messung. Wir können aber die gelieferten Dinge zeigen: erreichbares Portal, API, wiederholbare Tests, nachvollziehbare Artikel und Kommunikationsabläufe.

## So zeigst du es in 5 Minuten

1. Öffne die Live-Demo und sage, welches Problem CloudShop hat.
2. Klicke Run status check und erkläre HTTP 200 sowie die Grenzen.
3. Zeige Current evidence und warum noch kein Kunden-Health-Score vorliegt.
4. Zeige Simulated day 60: 57,5 Punkte bedeutet Enablement nötig; nicht sofort mehr verkaufen.
5. Öffne den API-Incident und erkläre Symptom, Ursache, Korrektur, Prüfung und Kundenupdate.
6. Schließe mit der Empfehlung aus dem Value Review.

## Lokale Übung selbst wiederholen

Im Projektordner:

```powershell
npm run validate
npm test
npm run exercise
npm run preview
```

Die Vorschau öffnest du unter http://127.0.0.1:4173. Für einen sichtbaren Fehler stoppe die Vorschau mit Ctrl+C und starte:

```powershell
$env:LAB_HEALTH_MODE = 'unavailable'
npm run preview
```

Seite neu laden: API unavailable. Wiederherstellen:

```powershell
# Zuerst laufende Vorschau mit Ctrl+C stoppen
$env:LAB_HEALTH_MODE = 'operational'
npm run preview
```

Für den Berechtigungsfehler lautet der Modus access-denied. Diese Modi existieren ausschließlich im lokalen Vorschau-Server, nicht in der veröffentlichten Azure-Function.

## Was du glaubwürdig über dich sagen kannst

„Ich habe mein technisches Supportwissen mit einem Azure-Praxisprojekt verbunden. Im Projekt geht es um mehr als Hosting: Kundenbedarf, Onboarding, reproduzierbare Fehlerfälle, verständliche Kommunikation und eine ehrliche Bewertung des Nutzens.“

Falls jemand nach einer Codezeile fragt, erkläre Zweck und Verhalten. Du musst dich nicht als Entwickler darstellen. Du solltest aber erklären können, was gemessen wird und was nicht.
