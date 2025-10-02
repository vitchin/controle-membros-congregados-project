from playwright.sync_api import sync_playwright, expect, Page
import time

def run_verification(page: Page):
    """
    This script verifies the user registration and table display functionality.
    """
    print("Navigating to the registration page...")
    page.goto("http://localhost:3000/register")

    # Aguarda o carregamento do formulário
    expect(page.get_by_role("heading", name="REGISTRAR")).to_be_visible(timeout=10000)
    print("Registration page loaded.")

    # Preenche os campos do formulário
    print("Filling out the form...")
    page.get_by_label("Nome:").fill("Jules Teste")
    page.get_by_label("Conhecido Por:").fill("Jules")

    # Interage com o select personalizado para "Sexo"
    page.get_by_label("Sexo:").click()
    page.get_by_role("option", name="MASCULINO").click()

    page.get_by_label("Data de Nascimento:").fill("1990-01-01")

    # Interage com o select personalizado para "Estado Civil"
    page.get_by_label("Estado Civil:").click()
    page.get_by_role("option", name="SOLTEIRO").click()

    page.get_by_label("Telefone:").fill("99999-9999")
    page.get_by_label("Email:").fill("jules.teste@example.com")
    page.get_by_label("Data da Conversão:").fill("2020-01-01")
    page.get_by_label("CEP:").fill("01001000")
    # Espera o preenchimento automático do endereço
    time.sleep(2) # Pequena pausa para a API do ViaCEP responder
    print("Form filled.")

    # Envia o formulário
    print("Submitting the form...")
    register_button = page.get_by_role("button", name="REGISTRAR")
    expect(register_button).to_be_enabled()
    register_button.click()

    # Aguarda o redirecionamento e o carregamento da tabela
    print("Waiting for redirection to the table page...")
    expect(page).to_have_url("http://localhost:3000/table", timeout=15000)
    expect(page.get_by_role("heading", name="TABELA MEMBROS/CONGREGADOS")).to_be_visible(timeout=10000)
    print("Table page loaded.")

    # Verifica se o novo usuário está na tabela
    print("Verifying the new user in the table...")
    new_user_cell = page.get_by_role("cell", name="Jules Teste")
    expect(new_user_cell).to_be_visible(timeout=10000)
    print("User 'Jules Teste' found in the table.")

    # Tira a captura de tela
    print("Taking screenshot...")
    page.screenshot(path="jules-scratch/verification/verification.png")
    print("Screenshot saved to jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()