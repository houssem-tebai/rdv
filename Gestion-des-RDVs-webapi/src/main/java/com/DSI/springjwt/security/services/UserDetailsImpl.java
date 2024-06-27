package com.DSI.springjwt.security.services;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


import com.DSI.springjwt.enums.Statut;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.DSI.springjwt.models.User;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;
  private String username;
  private String email;
  private String password;
  private Statut statut;
  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsImpl build(User user) {
    //String roleAuthority = "ROLE_" + user.getRole().getName();
    String roleAuthority = String.valueOf(user.getRole().getName());

    List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority(roleAuthority)
    );

    return new UserDetailsImpl(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getPassword(),
            user.getStatut(),
            authorities
    );
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}

