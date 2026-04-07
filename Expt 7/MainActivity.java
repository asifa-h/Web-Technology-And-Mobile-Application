package com.example.calculatorapp;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    EditText num1, num2;
    Button add, sub, mul, div, clear;
    TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        num1 = findViewById(R.id.editTextNumber1);
        num2 = findViewById(R.id.editTextNumber2);

        add = findViewById(R.id.buttonAdd);
        sub = findViewById(R.id.buttonSubtract);
        mul = findViewById(R.id.buttonMultiply);
        div = findViewById(R.id.buttonDivide);
        clear = findViewById(R.id.buttonClear);

        result = findViewById(R.id.textViewResult);

        add.setOnClickListener(v -> calculate('+'));
        sub.setOnClickListener(v -> calculate('-'));
        mul.setOnClickListener(v -> calculate('*'));
        div.setOnClickListener(v -> calculate('/'));

        clear.setOnClickListener(v -> {
            num1.setText("");
            num2.setText("");
            result.setText("Result");
        });
    }

    private void calculate(char op){
        String n1 = num1.getText().toString();
        String n2 = num2.getText().toString();

        if(n1.isEmpty() || n2.isEmpty()){
            result.setText("Enter both numbers");
            return;
        }

        double a = Double.parseDouble(n1);
        double b = Double.parseDouble(n2);
        double res = 0;

        switch(op){
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/':
                if(b==0){
                    result.setText("Cannot divide by zero");
                    return;
                }
                res = a / b;
                break;
        }

        result.setText("Result: " + res);
    }
}