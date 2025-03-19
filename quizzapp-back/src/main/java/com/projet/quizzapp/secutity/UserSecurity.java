package com.projet.quizzapp.secutity;

import com.projet.quizzapp.entities.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserSecurity implements UserDetails {

    private final User user;

    public UserSecurity(User user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Retourner false si l'utilisateur doit être bloqué après expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Retourner false si l'utilisateur doit être bloqué après plusieurs tentatives infructueuses
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Retourner false si les credentials doivent expirer
    }

    @Override
    public boolean isEnabled() {
        return true;  // Retourner false si l'utilisateur doit être désactivé
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
    }

    // Accesseur pour l'entité User
    public User getUser() {
        return user;
    }
}
